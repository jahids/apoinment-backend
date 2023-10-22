import { Dispatch, SetStateAction } from "react";
import { GiCancel } from "react-icons/gi";
import { useSelector } from "react-redux";

const AppointmentDetailModal = ({
  modalStatus,
  setModalStatus,
}: {
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const selectedAppointmentData = useSelector(
    (state: any) => state?.appointment?.selectedAppointmentData
  );

  return (
<div>
  <input
    type="checkbox"
    id="my_modal_6"
    checked={modalStatus}
    className="modal-toggle"
  />
  <div className="modal flex items-center justify-center fixed left-0 top-0 w-full h-full bg-black bg-opacity-50">
    <div className="modal-box bg-white w-1/2 rounded-lg shadow-lg">
      <div className="relative p-6">
        <h3 className="font-bold text-center text-2xl text-gray-800 mb-4 uppercase">
          Appointment Detail
        </h3>
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={() => {
            setModalStatus(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4">
          <div className="text-center">
            <p className="text-gray-900 text-lg font-semibold">Title</p>
            <p className="text-gray-700 text-md mt-2">
              {selectedAppointmentData?.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default AppointmentDetailModal;
