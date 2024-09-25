import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import reloadimg from "../../../assets/captcha.png";
import { LoadCanvasTemplateNoReload } from "react-simple-captcha";
import BeatLoader from "react-spinners/ClipLoader";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function ComplainForm({
  offices,
  hideInfo,
  setHideInfo,
  inputValue,
  setInputValue,
  selectedOffice,
  setSelectedOffice,
  complainSubmit,
  reloadCaptcha,
  handleCaptchaChange,
  captchaError,
  officeName,
  setOfficeName,
  title,
  setTitle,
  loading,
  getSummary,
  files,
  setFiles,
  advanceShow,
  setAdvanceShow
}) {
  const [inputs, setInputs] = useState([{ id: Date.now() }]);
  const [complainDetails, setComplainDetails] = useState("");

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { id: Date.now() }]);
    } else {
      toast.error("Maximum of 5 file inputs allowed.");
    }
  };

  const removeInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map(file => ({ id: Date.now(), file })); // Adding an id to each file
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleCustomOfficeToggle = () => {
    setOfficeName(!officeName);
    if (!officeName) {
      setSelectedOffice(null);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleComplainDetailsChange = (event) => {
    setComplainDetails(event.target.value);
    getSummary(event); // Call getSummary whenever the complain details change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    complainSubmit(event, files); // Pass the files to the submit handler
  };

  return (
    <section className="container mx-auto md:px-5 px-4 my-8">
      <hr className="border border-black mt-12" />
      <h2 className="custom-bold-font text-3xl font-medium text-center -mt-4 bg-white w-[350px] mx-auto mb-10 text-violet-800">
        নাগরিক অভিযোগ দাখিল ফরম
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={`${advanceShow ? "hidden" : ""}`}>
          <div>
            <label
              htmlFor="complain_details"
              className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
            >
              অভিযোগের বিবরণ <span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              required
              id="complain_details"
              name="complain_details"
              rows="4"
              value={complainDetails} // Bind the value to the state
              onChange={handleComplainDetailsChange} // Update state on change
              className="custom-font md:text-[16px] block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              placeholder="অভিযোগ সম্পর্কিত বিস্তারিত লিখুন..."
            ></textarea>
          </div>

          <div>
            <Toaster />
            <label
              htmlFor="complain_title"
              className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
            >
              অভিযোগ সংক্রান্ত প্রমাণাদি (
              <span className="text-gray-500">যদি থাকে</span>)
            </label>
            {inputs.map((input) => (
              <div key={input.id} className="flex items-center mb-2 gap-2">
                <input
                  type="file"
                  className="text-sm text-stone-500
              file:mr-5 file:py-3 file:px-5 file:border-[1px]
              file:text-xs file:font-medium
              file:bg-stone-100 file:text-stone-700
              hover:file:cursor-pointer hover:file:bg-blue-50
              hover:file:text-blue-800 border-2 rounded-md w-full my-2
              transition-colors duration-200 ease-in-out
              hover:bg-gray-100"
                  onChange={(e) => handleFileChange(e)} // Pass input id
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.mp4,.avi"
                />
                <Fab
                  sx={{
                    height: 38,
                    width: 38,
                    boxShadow: "none",
                    background: "#ececec",
                  }}
                  aria-label="remove"
                  onClick={() => removeInput(input.id)}
                >
                  <RemoveIcon />
                </Fab>
              </div>
            ))}
            <p className="text-xs text-gray-500 mb-2">
              Accepted formats: jpg, jpeg, png, pdf, doc, docx, xls, xlsx,
              mp4, avi (max 10MB)
            </p>
            <Fab
              sx={{
                height: 35,
                width: 35,
                marginBottom: 4,
                boxShadow: "none",
                background: "#ececec",
              }}
              aria-label="add"
              onClick={addInput}
            >
              <AddIcon />
            </Fab>
          </div>

          <div className="flex items-center justify-end py-2 mt-5 gap-5">
            <button onClick={() => setAdvanceShow(!advanceShow)} className="bg-blue-700 p-3 rounded-md text-white">Advance option</button>
            <button
              type="submit"
              className="custom-bold-font md:text-[16px] py-3 px-4 text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 text-center flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <BeatLoader color="#fff" size={20} />
                  <span className="ms-2">Submitting...</span>
                </>
              ) : (
                "অভিযোগ দাখিল করুন"
              )}
            </button>
          </div>
        </div>

        <div className={`${!advanceShow ? "hidden" : "grid"} md:grid-cols-3 md:gap-10`}>
          {/* Left div */}
          <div className="md:col-span-2 md:me-20">
            <div>
              <label
                htmlFor="complain_details"
                className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
              >
                অভিযোগের বিবরণ <span className="text-red-500 font-bold">*</span>
              </label>
              <textarea
                required
                id="complain_details"
                name="complain_details"
                rows="4"
                value={complainDetails} // Bind the value to the state
                onChange={handleComplainDetailsChange} // Update state on change
                className="custom-font md:text-[16px] block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="অভিযোগ সম্পর্কিত বিস্তারিত লিখুন..."
              ></textarea>
            </div>

            <div className="my-4">
              <label
                htmlFor="complain_title"
                className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
              >
                অভিযোগের বিষয় <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="complain_title"
                name="complain_title"
                value={title} // Bind the value to the state
                onChange={handleTitleChange} // Update state on change
                className="custom-font md:text-[16px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 bg-gray-50 hover:bg-gray-100"
                placeholder="অভিযোগের বিষয় লিখুন..."
                required
              />
            </div>

            <div>
              <Toaster />
              <label
                htmlFor="complain_title"
                className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
              >
                অভিযোগ সংক্রান্ত প্রমাণাদি (
                <span className="text-gray-500">যদি থাকে</span>)
              </label>
              {inputs.map((input) => (
                <div key={input.id} className="flex items-center mb-2 gap-2">
                  <input
                    type="file"
                    className="text-sm text-stone-500
              file:mr-5 file:py-3 file:px-5 file:border-[1px]
              file:text-xs file:font-medium
              file:bg-stone-100 file:text-stone-700
              hover:file:cursor-pointer hover:file:bg-blue-50
              hover:file:text-blue-800 border-2 rounded-md w-full my-2
              transition-colors duration-200 ease-in-out
              hover:bg-gray-100"
                    onChange={(e) => handleFileChange(e)} // Pass input id
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.mp4,.avi"
                  />
                  <Fab
                    sx={{
                      height: 38,
                      width: 38,
                      boxShadow: "none",
                      background: "#ececec",
                    }}
                    aria-label="remove"
                    onClick={() => removeInput(input.id)}
                  >
                    <RemoveIcon />
                  </Fab>
                </div>
              ))}
              <p className="text-xs text-gray-500 mb-2">
                Accepted formats: jpg, jpeg, png, pdf, doc, docx, xls, xlsx,
                mp4, avi (max 10MB)
              </p>
              <Fab
                sx={{
                  height: 35,
                  width: 35,
                  marginBottom: 4,
                  boxShadow: "none",
                  background: "#ececec",
                }}
                aria-label="add"
                onClick={addInput}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>

          {/* Right div */}
          <div>
            <div className="w-full">
              <div>
                <label
                  htmlFor="complainer_info"
                  className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
                >
                  অভিযোগকারীর তথ্য
                </label>
                <input
                  disabled={hideInfo}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  id="complainer_info"
                  name="complainer_info"
                  className="bg-gray-50 border border-gray-300 text-gray-900 custom-font rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2 hover:bg-gray-100"
                  placeholder="নাম, মোবাইল নাম্বার, ঠিকানা..."
                />
              </div>
            </div>

            <div className="flex items-center my-3">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={hideInfo}
                onChange={() => setHideInfo(!hideInfo)} // Toggle the state
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="default-checkbox"
                className="custom-font md:text-[18px] ms-2 font-medium text-gray-900"
              >
                আমার পরিচয় গোপন রাখতে চাই।
              </label>
            </div>


            {hideInfo && (
              <span className="text-sm custom-font text-red-500 block mb-2">
                * মোবাইল নাম্বার এবং পূর্ণ নাম প্রদান না করলে অভিযোগটি
                অজ্ঞাতনামা হিসাবে বিবেচিত হবে এবং আপনি পরবর্তীতে অভিযোগটি
                ট্র্যাক করতে পারবেন না।
              </span>
            )}

            {!officeName && (
              <div className="w-full rounded-md bg-gray-50 hover:bg-gray-100">
                <Autocomplete
                  disablePortal
                  options={offices}
                  getOptionLabel={(option) => option.name_Bn || ""}
                  value={selectedOffice}
                  onChange={(event, newValue) => setSelectedOffice(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span className="custom-font">দপ্তর নির্বাচন করুন</span>
                      }
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray", // Sets the default border color
                            opacity: 0.3,
                          },
                          "&:hover fieldset": {
                            borderColor: "gray", // Sets the border color on hover
                            opacity: 0.7,
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
            )}

            <div className="flex items-center my-3">
              <input
                id="custom_office_name"
                type="checkbox"
                value=""
                name="custom_office_name"
                onChange={handleCustomOfficeToggle}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              ></input>
              <label
                htmlFor="custom_office_name"
                className="custom-font md:text-[18px] ms-2 font-medium text-gray-900"
              >
                দপ্তরের নাম লিখে দিতে চাই
              </label>
            </div>

            {officeName && (
              <div>
                <label
                  htmlFor="custom_office"
                  className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900"
                >
                  দপ্তরের নাম লিখুন
                </label>
                <input
                  type="text"
                  id="custom_office"
                  name="custom_office"
                  className="custom-font md:text-[16px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 bg-gray-50 hover:bg-gray-100"
                  placeholder="দপ্তরের নাম লিখুন..."
                  required
                />
              </div>
            )}

            <div className="mt-6 border border-gray-200/80 bg-gray-100/60 rounded-md p-3">
              <div className="mb-2 flex gap-3">
                <LoadCanvasTemplateNoReload />
                <img
                  src={reloadimg}
                  alt="reload-captcha-image"
                  className="w-9 h-9"
                  onClick={() => reloadCaptcha()}
                />
              </div>
              <input
                type="text"
                className="border border-gray-400 rounded-sm"
                placeholder="Enter Captcha Value"
                onChange={handleCaptchaChange}
              />
              <br />
              {captchaError && (
                <span className="text-red-500">
                  Captcha is incorrect. Please try again.
                </span>
              )}
            </div>

            <div className="flex items-center justify-end py-2 mt-5">
              <button
                type="submit"
                className="custom-bold-font md:text-[16px] py-3.5 px-4 text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 w-full text-center flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <BeatLoader color="#fff" size={20} />
                    <span className="ms-2">Submitting...</span>
                  </>
                ) : (
                  "অভিযোগ দাখিল করুন"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

ComplainForm.propTypes = {
  offices: PropTypes.arrayOf(
    PropTypes.shape({
      name_Bn: PropTypes.string.isRequired,
    })
  ).isRequired,
  hideInfo: PropTypes.bool.isRequired,
  setHideInfo: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  selectedOffice: PropTypes.object,
  setSelectedOffice: PropTypes.func.isRequired,
  complainSubmit: PropTypes.func.isRequired,
  reloadCaptcha: PropTypes.func.isRequired,
  handleCaptchaChange: PropTypes.func.isRequired,
  captchaError: PropTypes.bool.isRequired,
  officeName: PropTypes.bool.isRequired,
  setOfficeName: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getSummary: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  advanceShow: PropTypes.bool.isRequired,
  setAdvanceShow: PropTypes.func.isRequired,
};

export default ComplainForm;
