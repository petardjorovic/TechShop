import { useFormik } from "formik";
import * as Yup from "yup";
import "./ContactPage.scss";

function ContactPage() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required(" is required!"),
      lastName: Yup.string().required(" is required!"),
      email: Yup.string().email(" is not valid!").required(" is required!"),
      message: Yup.string().required(" is required!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const showErrors = (inputName) => {
    return (
      formik.errors[inputName] &&
      formik.touched[inputName] &&
      formik.errors[inputName]
    );
  };
  return (
    <>
      <div className="container">
        <div className="contact-wrapper">
          <h1 className="">Contact Us</h1>
          <form className="contact-form" onSubmit={formik.handleSubmit}>
            <div className="full-name">
              <div className="input-wrapper">
                <label
                  htmlFor="firstName"
                  className={showErrors("firstName") ? "text-danger" : ""}
                >
                  First Name
                  <span className="text-danger">{showErrors("firstName")}</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="lastName"
                  className={showErrors("lastName") ? "text-danger" : ""}
                >
                  Last Name{" "}
                  <span className="text-danger">{showErrors("lastName")}</span>
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="input-wrapper">
              <label
                htmlFor="email"
                className={showErrors("email") ? "text-danger" : ""}
              >
                Email <span className="text-danger">{showErrors("email")}</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label
                htmlFor="message"
                className={showErrors("message") ? "text-danger" : ""}
              >
                Message{" "}
                <span className="text-danger">{showErrors("message")}</span>
              </label>
              <textarea
                name="message"
                placeholder="Message"
                id="message"
                value={formik.values.message}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <button className="btn btn-primary my-2 px-4">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
