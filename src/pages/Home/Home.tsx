import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CreateAppointmentModal from "../../components/Modals/CreateAppointmentModal";
import { useDispatch, useSelector } from "react-redux";
import { storeAppointmentData } from "../../Redux/AppointmentSlice";
import axios from "axios";
import { serverUrl } from "../../Redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const data = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const yearList = useSelector((state: any) => state?.appointment?.yearList);
  const monthList = useSelector((state: any) => state?.appointment?.monthList);
  const appointmentList = useSelector(
    (state: any) => state?.appointment?.appointmentList
  );
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getMonth() + 1}`
  );

  const getData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/events`);
      // console.log(response.data);
      dispatch(storeAppointmentData(response.data));
    } catch (error) {
      console.log("createProjectRequest error", error);
      alert("task not create");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1 w-48">
              {selectedYear}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {yearList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    navigate(`/year/${item}/month/${selectedMonth}`);
                  }}
                >
                  <a className={item === selectedYear ? "text-red-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown">
            <label tabIndex={1} className="btn m-1 w-48">
              {selectedMonth}
            </label>
            <ul
              tabIndex={1}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {monthList?.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    navigate(`/year/${selectedYear}/month/${item}`);
                  }}
                >
                  <a className={item === selectedMonth ? "text-red-600" : ""}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <button
            className="btn m-1"
            onClick={() => {
              setModalStatus(true);
            }}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        // headerToolbar={false}
        initialView="dayGridMonth"
        events={appointmentList}
      />

      <CreateAppointmentModal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
    </div>
  );
};

export default Home;
