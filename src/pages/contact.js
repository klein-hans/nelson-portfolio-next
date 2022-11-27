import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Input } from "components/atoms";
import Button from "components/atoms/button/index.js";
import { NextSeo } from "next-seo";
import { IconContext } from "react-icons";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import Alert from "components/atoms/alert/index.js";

const formInitial = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM);
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState(formInitial);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (state.submitting && state.succeeded) {
      setForm(formInitial);
      setShowAlert(true);
    }
  }, [state]);

  return (
    <>
      <NextSeo title="Nelson | Contact" description="lorem ipsum" />
      <div className="grid grid-rows-2 grid-flow-col h-screen">
        <motion.div
          className="grid content-center h-screen "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <h3 className="font-bebas-neue mt-52 relative text-9xl text-center font-sans font-bold tracking-tighter text-gray-800 dark:text-white text-shadow-2xl">
            CONTACT
          </h3>
        </motion.div>
      </div>

      <Alert
        onClose={() => setShowAlert(false)}
        show={showAlert}
        color="primary"
        className="w-96"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        children={
          <>
            <span className="block text-gray-200 ">
              Thank you for reaching out. <br /> Will get back to you as soon as possible
            </span>
          </>
        }
      />

      <div className="flex justify-center ">
        <div className="grid content-center grid-cols-2 gap-4">
          <div>
            <form className="" onSubmit={handleSubmit}>
              <div className="max-w-2xl px-5 py-10">
                <div className="mb-6 font-bebas-neue font-semibold text-5xl text-left text-gray-800 dark:text-white">
                  SEND ME A MESSAGE
                </div>
                <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                  <div className="col-span-2 lg:col-span-1">
                    <div className=" relative ">
                      <Input
                        type="text"
                        id="contact-form-name"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="Enter Name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <div className=" relative ">
                      <Input
                        type="text"
                        id="contact-form-email"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        placeholder="Enter Email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-gray-700" htmlFor="name">
                      <Input
                        type="textarea"
                        className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                        id="message"
                        placeholder="Enter your message"
                        name="message"
                        rows="5"
                        cols="40"
                        value={form.message}
                        onChange={handleInputChange}
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </label>
                  </div>
                  <div className="col-span-2 text-right">
                    <Button
                      type="submit"
                      disabled={state.submitting}
                      color="primary"
                      className="text-neutral-800"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="dark:text-white flex items-center  justify-center">
            <div className="grid grid-rows-3 grid-flow-col gap-0">
              <IconContext.Provider
                value={{
                  size: "1.5em",
                  className: "text-primary-800 dark:text-primary-500",
                }}
              >
                <div className="flex justify-start">
                  <FaPhone className="animate-bounce" />
                  <span className="ml-5"> (02) 555-1378</span>
                </div>
              </IconContext.Provider>

              <IconContext.Provider
                value={{
                  size: "1.5em",
                  className: "text-primary-800 dark:text-primary-500",
                }}
              >
                <div className="flex justify-start">
                  <FaEnvelope className="animate-bounce" />
                  <span className="ml-5"> nelescuton@gmail.com</span>
                </div>
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  size: "1.5em",
                  className: "text-primary-800 dark:text-primary-500",
                }}
              >
                <div className="flex justify-start">
                  <FaMapMarkerAlt className="animate-bounce" />
                  <span className="ml-5">
                    {" "}
                    U111 MB28, PDS Ave., <br />
                    Ususan, Taguig City, <br /> Philippines 1632
                  </span>
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
