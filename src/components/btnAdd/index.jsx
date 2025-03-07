import "./btnAdd.css";

const BtnAdd = ({ text, clase }) => {
  return <button className={clase || "btn-add"}>{text || "Agregar"}</button>;
};

export default BtnAdd;
