import ContactItem from "./ContactItem/ContactItem";
import { connect } from "react-redux";

const ContactList = ({ List }) => {
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

export default connect(mapStateToProps)(ContactList);
