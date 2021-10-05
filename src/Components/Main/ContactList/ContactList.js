import { useEffect } from "react";
import ContactItem from "./ContactItem/ContactItem";
import { connect } from "react-redux";
import API from "../../../Services/APIService";
// Import Actions
import { GetAllContacts } from "../../../Actions/ContactListActions";

const ContactList = ({ List, GetAllContacts }) => {
  useEffect(() => {
    API.GetContactList().then(data => {
      GetAllContacts(data);
    });
  }, []);

  const contact = List.map(item => {
    return <ContactItem key={item.Id} {...item} {...item} />;
  });

  return (
    <section>
      {contact.length > 0 ? (
        contact
      ) : (
        <p className="emptyList">Contact list is empty!</p>
      )}
    </section>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};

const mapDispatchToProps = {
  GetAllContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
