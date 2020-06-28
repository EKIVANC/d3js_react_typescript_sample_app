import React, { useEffect, useState } from 'react';
import { LineChart } from '../component/chart/LineChart';
import getChartData from '../api/get-chart-data';
import IChartData from '../interface/IChartData';
import transformToIChartData from '../util/transformer';
import { ModalAddNewPoint } from './ModalAddNewPoint';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notificationMsgAnErrorOcc } from '../util/constants';

export const ChartLayout = (): JSX.Element => {
  const [data, setData] = useState<IChartData[]>();
  const [showModal, setShowModal] = useState(false);

  const getData = () => {
    getChartData()
      .then((response) => {
        if (response) {
          // convert x field from String to Date
          const map = transformToIChartData(response);
          setData(map);
        }
      })
      .catch((error) => {
        notify(false, `${notificationMsgAnErrorOcc} - ${error}`);
      });
  };

  //work only component mount
  useEffect(() => {
    getData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const notify = (result: boolean, message: string) => {
    if (result) {
      toast.success(message);
      getData();
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="chart-layout">
      <ToastContainer position={'top-left'} autoClose={3000} />
      {data && (
        <>
          <LineChart data={data} />
          <div className="add-data-button-container">
            <button className="button" onClick={openModal}>
              Add New Point
            </button>
            <ModalAddNewPoint
              showModal={showModal}
              closeEvent={closeModal}
              notify={notify}
            />
          </div>
        </>
      )}
    </div>
  );
};
