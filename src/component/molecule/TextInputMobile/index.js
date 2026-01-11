import { Gap, CustomInput } from "../../atom";
import "./textInputMobile.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TextInputMobile   = ({ ...rest }) => {

  return (
    <>
      <div className="headerNav">
        <Gap height={15} />
        <div
          className="ml-3 d-flex"
          style={{
            background: "#eee",
            borderRadius: 20,
            width: "90%",
            height: 60
          }}
        >
          <i className="fas fa-search ml-3 mt-4" style={{ color: "#aaa" }}></i>
          <div>
            <CustomInput
              placeholder="Search location"
              style={{
                borderRadius: 10,
                width: "100%",
                marginLeft: 3,
                background: "#eee",
                borderColor: "#eee",
              }}
              {...rest}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextInputMobile  ;
