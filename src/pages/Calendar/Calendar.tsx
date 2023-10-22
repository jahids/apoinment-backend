import { useNavigate, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "react";
import CreateAppointmentModal from "../../components/Modals/CreateAppointmentModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../Redux";
import { storeAppointmentData } from "../../Redux/AppointmentSlice";

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");
  const { year, month } = useParams<{ year: string; month: string }>();
  console.log(year, month);

  const calendarRef = useRef<FullCalendar | null>(null);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const yearList = useSelector((state: any) => state?.appointment?.yearList);
  const monthList = useSelector((state: any) => state?.appointment?.monthList);
  const appointmentList = useSelector(
    (state: any) => state?.appointment?.appointmentList
  );

  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getUTCFullYear()}`
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getMonth() + 1}`
  );

  const getData = async () => {
    try {
      const response = await axios.get(`${serverUrl}/events`);
      dispatch(storeAppointmentData(response.data));
    } catch (error) {
      console.log("getData error", error);
      alert("Error fetching data");
    }
  };

  const handleEventClick = (clickInfo: any) => {
    setModalStatus(true);
    setSelectedId(clickInfo.event.id || "");
    console.log("id--->", clickInfo.event.id);
    const { title, start, end } = clickInfo.event;
    console.log("Event clicked - Title:", title, clickInfo);
    console.log("Start:", start);
    console.log("End:", end);
  };

  useEffect(() => {
    if (!year) return;
    setSelectedYear(year);

    if (month) {
      setSelectedMonth(month);
    }

    getData();

    if (calendarRef.current) {
      let currData = month;
      if (month) {
        if (+month < 10) {
          currData = `0${month}`;
        }
        const api = calendarRef.current.getApi();
        api.gotoDate(`${year}-${currData}-01`); // Provide your target month in the format 'YYYY-MM-DD'
      }
    }
  }, [year, month]);

  return (
    <div className="p-5">
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn-sm hover:bg-purple-700  bg-purple-500 text-white btn m-1 w-48"
            >
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
            <label
              tabIndex={1}
              className="btn-sm hover:bg-purple-700  bg-purple-500 text-white btn m-1 w-48"
            >
              {selectedMonth}
            </label>
            <ul
              tabIndex={1}
              className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {monthList?.map((item: string) => (
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
            }}
          >
            Create Appointment
          </button>
        </div>
      </div>

      <FullCalendar
      
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={appointmentList}
        eventClick={handleEventClick}
      />

      <CreateAppointmentModal
        actionType={actionType}
        setActionType={setActionType}
        id={selectedId}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
    </div>
  );
};

export default Calendar;

