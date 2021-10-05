import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DeleteContact } from "../../../../Actions/ContactListActions";
import API from "../../../../Services/APIService";

const ContactItem = ({
  Id,
  Name,
  Avatar,
  Phone,
  Email,
  Status,
  Gender,
  DeleteContact,
  List
}) => {
  const image = `https://api.randomuser.me/portraits/${Gender}/${Avatar}.jpg`;

  let statusColor = "";
  switch (Status) {
    case "Friend":
      statusColor = "lab lab-warning";
      break;
    case "Work":
      statusColor = "lab lab-success";
      break;
    case "Family":
      statusColor = "lab lab-primary";
      break;
    case "Private":
      statusColor = "lab lab-danger";
      break;
    default:
  }

  const onDelete = Id => {
    const index = List.findIndex(elem => elem.Id === Id);
    let tmpList = List.slice();
    const partOne = tmpList.slice(0, index);
    const partTwo = tmpList.slice(index + 1);
    tmpList = [...partOne, ...partTwo];
    DeleteContact(tmpList);
    API.UpdateDatabase(tmpList);
  };

  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
        <div>
          <img src={image} alt="image" className="avatar" /> {Name}
        </div>
        <div className={statusColor}>{Status}</div>
      </div>
      <div className="field phone">{Phone}</div>
      <div className="field email">{Email}</div>
      <div className="contactIcons">
        <Link to="/edit-contact">
          <i className="far fa-edit fa-2x"></i>
        </Link>
        <i className="far fa-trash-alt fa-2x" onClick={() => onDelete(Id)}></i>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};

const mapDispatchToProps = {
  DeleteContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
