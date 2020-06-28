import React from 'react';
import Popup from 'reactjs-popup';
import postChartData from '../api/post-chart-data';
import {
  notificationMsgAdded,
  notificationMsgAnErrorOcc,
} from '../util/constants';

type ModalAddNewPointProps = {
  showModal: boolean;
  closeEvent: () => void;
  notify: (result: boolean, message: string) => void;
};

export const ModalAddNewPoint = ({
  showModal,
  closeEvent,
  notify,
}: ModalAddNewPointProps): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const xValue: Date = new Date(data.get('x') as string);
    const yValue: number = Number.parseInt(data.get('y') as string);
    postChartData({
      x: xValue,
      y: yValue,
    })
      .then((result) => {
        if (result?.parsedBody?.status === 'ok') {
          notify(true, notificationMsgAdded);
        }
      })
      .catch((error) => {
        notify(false, `${notificationMsgAnErrorOcc} - Error: ${error}`);
      })
      .finally(() => {
        closeEvent();
      });
  };

  return (
    <Popup open={showModal} onClose={closeEvent} modal closeOnDocumentClick>
      <span className="modal-add-new-point">
        <button type="button" className="close" onClick={closeEvent}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-row">
              <label htmlFor="y">Value (Y):</label>
              <input type="number" id="y" name="y" required />
            </div>
            <div className="form-row">
              <label htmlFor="x">Date (X):</label>
              <input type="datetime-local" id="x" name="x" required />
            </div>
          </div>
          <div className="form-submit">
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
      </span>
    </Popup>
  );
};
