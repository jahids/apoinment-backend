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

const AppStartingPage = () => {
  const data = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [actiontype, setactiontype] = useState('')
  const yearList = useSelector((state: any) => state?.appointment?.yearList);
  const monthList = useSelector((state: any) => state?.appointment?.monthList);
  const [specificid, setspecificid] = useState('')
  const appointmentList = useSelector(
    (state: any) => state?.appointment?.appointmentList
  );
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [selectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth] = useState<string>(
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

  const handleEventClick = (clickInfo: any) => {
    setModalStatus(true)
    setspecificid(clickInfo.event.id || 1)
    console.log("id--->",clickInfo.event.id);
    const { title, start, end } = clickInfo.event;
    console.log('Event clicked - Title:', title, clickInfo);
    console.log('Start:', start);
    console.log('End:', end);
  };

  return (
    <div className="p-5">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label tabIndex={0} className="btn-sm hover:bg-purple-700  bg-purple-500 text-white btn m-1 w-48">
              {selectedYear}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {yearList?.map((item: string) => (
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
            <label tabIndex={1} className="btn-sm hover:bg-purple-700  bg-purple-500 text-white btn m-1 w-48">
              {selectedMonth}
            </label>
            <ul
              tabIndex={1}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {monthList?.map((item : string) => (
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
            className="btn m-1 bg-purple-500"
            onClick={() => {
              setModalStatus(true);
              setactiontype('createApoinment')
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
        eventClick={handleEventClick} 
        />

      <CreateAppointmentModal
       actiontype={actiontype}
       actiontypeSeter = {setactiontype}
       id={specificid}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
    </div>
  );
};

export default AppStartingPage;
