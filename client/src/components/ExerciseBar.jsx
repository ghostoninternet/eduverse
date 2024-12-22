import AssignmentIcon from "@mui/icons-material/Assignment";
import formatDate from "../helpers/formatDate"
import PropTypes from 'prop-types'
const Exercise = ({
  isPlaying,
  handleExerciseClick,
  exerciseName,
  latestSubmitDate,
  isChecked
}) => {
  return (
    <div
      className={`flex p-4 gap-x-4 hover:bg-gray-300 ${
        isPlaying && "bg-gray-300"
      }`}
      onClick={handleExerciseClick}
    >
      <div className="w-1/12 flex justify-center items-center">
        <input
          type="checkbox"
          style={{ width: "20px", height: "20px" }}
          disabled
          checked = {isChecked}
        />
      </div>
      <div className="w-11/12 flex items-center gap-x-2">
        <AssignmentIcon fontSize="large" />
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-3 text-xl">
            <h3 className="">{exerciseName}</h3>
          </div>
          <p>Last submitted: {formatDate(latestSubmitDate)}</p>
        </div>
      </div>
    </div>
  );
};

Exercise.propTypes = {
  isPlaying: PropTypes.bool,
  handleExerciseClick: PropTypes.func,
  exerciseName: PropTypes.string,
  latestSubmitDate: PropTypes.string,
  isChecked: PropTypes.bool
}

export default Exercise;
