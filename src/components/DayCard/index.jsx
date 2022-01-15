import { Link } from "react-router-dom";
import moment from "moment";
import { DEFAULT_TITLE } from "../../utils/constants";

const DayCard = ({ dayLabel, dayRecord }) => {
  return dayRecord.id ? (
    <div className="col-md-4">
      <div
        className={`card ${dayRecord.get("tokenId") && `border-primary`} ${
          dayRecord.get("minted") && "border-success"
        } mb-4`}>
        {dayRecord.get("image_url") && (
          <img
            src={dayRecord.get("image_url")}
            className="card-img-top"
            alt="..."
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{dayLabel}</h5>
          <p className="card-text text-muted">{dayRecord.get("title")}</p>
          {dayRecord.get("minted") ? (
            <div className="row">
              <div className="col-md-12">
                <Link
                  to={`/day/${moment(dayLabel).unix()}`}
                  className="btn btn-success w-100">
                  See Details
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <Link
                  to={`/day/${moment(dayLabel).unix()}`}
                  className="btn btn-primary w-100">
                  Edit
                </Link>
              </div>
              <div className="col-md-6">
                <button className="btn btn-success w-100">Mint</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="col-md-4">
      <div className={`card mb-4`}>
        <div className="card-body">
          <h5 className="card-title">{dayLabel}</h5>
          {/* <p className="card-text text-muted">{dayRecord.get("title")}</p> */}
          <div className="row">
            <div className="col-md-12">
              <Link
                to={`/day/${moment(dayLabel).unix()}`}
                className="btn btn-primary w-100">
                Add Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DayCard.defaultProps = {
  dayRecord: {
    title: DEFAULT_TITLE,
  },
};

export default DayCard;
