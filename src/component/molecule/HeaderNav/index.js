import { Gap, CustomInput } from "../../atom";
import "./headerNav.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HeaderNav = ({ ...rest }) => {

  return (
    <>
      <div className="headerNav">
        <Gap height={15} />
        <div
          className="ml-3 d-flex"
          style={{
            background: "#eee",
            borderRadius: 10,
            width: "92%",
            height: 43
          }}
        >
          <i className="fas fa-search ml-2 mt-3" style={{ color: "#aaa" }}></i>
          <div style={{ marginTop: -9 }}>
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

export default HeaderNav;
