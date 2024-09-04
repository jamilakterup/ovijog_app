import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import reloadimg from "../../../assets/captcha.png";
import { LoadCanvasTemplateNoReload } from "react-simple-captcha";
import BeatLoader from "react-spinners/ClipLoader";

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
  text,
  setText,
  title,
  setTitle,
  loading,
  error,
  getSummary,
}) {
  // Handler for checkbox to set custom office name and clear selected office
  const handleCustomOfficeToggle = () => {
    setOfficeName(!officeName);
    if (!officeName) {
      setSelectedOffice(null); // Clear the selected office when checkbox is checked
    }
  };

  return (
    <section className="container mx-auto md:px-5 px-4 my-8">
      <hr className="border border-black mt-12" />
      <h2 className="custom-bold-font text-3xl font-medium text-center -mt-4 bg-white w-[350px] mx-auto mb-10 text-violet-800">
        নাগরিক অভিযোগ দাখিল ফরম
      </h2>

      <form onSubmit={(event) => complainSubmit(event)}>
        <div className="grid md:grid-cols-3 md:gap-10">
          {/* left div */}
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
                value={text}
                onChange={(event) => getSummary(event)}
                className="custom-font md:text-[16px] block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder="অভিযোগ সম্পর্কিত বিস্তারিত লিখুন..."
              ></textarea>
              {loading && <p>Loading summary...</p>}
              {error && <p className="text-red-500">{error}</p>}
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
                className="custom-font md:text-[16px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 bg-gray-50 hover:bg-gray-100"
                placeholder="অভিযোগের বিষয় লিখুন..."
                required
              />
            </div>

            <div className="flex items-center justify-center w-full mb-4">
              <label
                htmlFor="dropzone_file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="custom-bold-font text-[18px] mb-2 text-gray-500">
                    <span className="font-semibold">
                      অভিযোগ সংক্রান্ত প্রমাণাদি(যদি থাকে)
                    </span>{" "}
                  </p>
                  <p className="custom-font text-[14px] text-gray-500">
                    ( ফাইলের সর্বোচ্চ সাইজ ১০ মেগাবাইট(MB) এবং ফাইলের অনুমোদিত
                    টাইপ সমূহ png, PNG, <br /> jpeg, JPEG, doc, DOC, docx, DOCX,
                    pdf, PDF, xls, xlsx, mp3, MP3, 3gp, 3GP, mp4, MP4)
                  </p>
                </div>
                <input
                  id="dropzone_file"
                  name="dropzone_file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* right div */}
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
                  required
                  type="text"
                  id="complainer_info"
                  name="complainer_info"
                  className="bg-gray-50 border border-gray-300 text-gray-900 custom-font rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2 hover:bg-gray-100 "
                  placeholder="নাম, মোবাইল নাম্বার, ঠিকানা..."
                ></input>
              </div>
            </div>

            <div className="flex items-center my-3">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                name="hide_info"
                onChange={() => setHideInfo(!hideInfo)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              ></input>
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
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getSummary: PropTypes.func.isRequired,
};

export default ComplainForm;
