import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import { serverUrl } from "../../Redux";

type AppointmentType = {
  name?: string;
  gender?: string;
  age?: string;
  date: string;
  time: string;
};

const CreateAppointmentModal = ({
  modalStatus = false,
  setModalStatus,
}: {
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [inputFieldData, setInputFieldData] = useState<AppointmentType>();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: AppointmentType | any) => {
    console.log(data);
    try {
      const reqData = { ...data, title: data?.name };
      const response = await axios.post(`${serverUrl}/events`, reqData);
      console.log(response);
      setModalStatus(false);
      reset({
        name: "",
        gender: "male",
        age: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.log("createProjectRequest error", error);
      alert("task not create");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <input
      type="checkbox"
      id="my_modal_6"
      checked={modalStatus}
      className="modal-toggle"
    />
    <div className="modal absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box bg-gray-100 w-1/3 p-8 rounded-lg shadow-lg">
        <div className="relative">
          <h3 className="font-bold text-center text-2xl mb-4 text-gray-800 uppercase">
            Enter Your Details
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="space-y-4" method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          <div className="flex items-center">
            <span className="ms-2 text-gray-700">Gender :</span>
            <div className="flex items-center space-x-4">
              <input
                {...register("gender")}
                type="radio"
                name="gender"
                className="radio radio-primary"
                id="male"
                value="male"
                defaultChecked
              />
              <label htmlFor="male" className="text-gray-700">
                Male
              </label>
              <input
                {...register("gender")}
                id="female"
                type="radio"
                name="gender"
                value="female"
                className="radio radio-primary"
              />
              <label htmlFor="female" className="text-gray-700">
                Female
              </label>
            </div>
          </div>
          <input
            {...register("age")}
            type="text"
            name="age"
            placeholder="Age"
            className="input input-bordered w-full"
          />
          <input
            {...register("date")}
            type="date"
            name="date"
            placeholder="Date"
            className="input input-bordered w-full"
          />
          <input
            {...register("time")}
            type="time"
            name="time"
            placeholder="Time"
            className="input input-bordered w-full"
          />
          <button className="btn w-full bg-blue-500 hover:bg-blue-700 text-white">
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default CreateAppointmentModal;
