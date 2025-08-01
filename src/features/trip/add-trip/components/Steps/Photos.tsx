import { useNavigate } from "react-router-dom";

import { AppRoutes } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@store/index";

import FilesForm from "../../../components/Files/FilesForm";
import { useAddTripMutation } from "../../../store/tripsApi";
import type { TripFile } from "../../../types";
import {
  resetWizard,
  selectWizardTrip,
  setPhotos,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export default function Photos() {
  const { photos, onSubmit, onFileStorageRemoval, isLoading, tripId } =
    usePhotosForm();

  return (
    <FilesForm
      tripId={tripId}
      defaultFiles={photos}
      onSubmit={onSubmit}
      SubmitComponent={<Pagination isLoading={isLoading} />}
      onFileStorageRemoval={onFileStorageRemoval}
      type="photo"
    />
  );
}

function usePhotosForm() {
  const [addTrip, { isLoading }] = useAddTripMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const trip = useAppSelector(selectWizardTrip);

  const onSubmit = async (data: TripFile[]) => {
    if (isLoading) {
      return;
    }

    dispatch(setPhotos(data));
    const result = await addTrip({ ...trip, photos: data });

    if (!("error" in result)) {
      navigate(AppRoutes.trips);
      dispatch(resetWizard());
    }
  };

  const onFileStorageRemoval = (data: TripFile[]) => {
    dispatch(setPhotos(data));
  };

  return {
    onSubmit,
    photos: trip.photos,
    tripId: trip.id,
    onFileStorageRemoval,
    isLoading,
  };
}
