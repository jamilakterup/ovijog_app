import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import reloadimg from "../../../assets/captcha.png";
import { LoadCanvasTemplateNoReload } from "react-simple-captcha";

function ComplainForm({
  offices,
  hideInfo,
  setHideInfo,
  inputValue,
  setInputValue,
  setSelectedOffice,
  complainSubmit,
  reloadCaptcha,
  handleCaptchaChange,
  captchaError
}) {


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (validateCaptcha(captchaValue)) {
  //     complainSubmit(event);
  //     setCaptchaError(false);
  //   } else {
  //     setCaptchaError(true);
  //   }
  // };

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
                htmlFor="complain_title"
                className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900 dark:text-white"
              >
                অভিযোগের বিষয় <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="complain_title"
                name="complain_title"
                className="custom-font md:text-[16px] bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                placeholder="অভিযোগের বিষয় লিখুন..."
                required
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="complain_details"
                className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900 dark:text-white"
              >
                অভিযোগের বিবরণ <span className="text-red-500 font-bold">*</span>
              </label>
              <textarea
                required
                id="complain_details"
                name="complain_details"
                rows="4"
                className="custom-font md:text-[16px] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="অভিযোগ সম্পর্কিত বিস্তারিত লিখুন..."
              ></textarea>
            </div>

            <div className="flex items-center justify-center w-full mb-4">
              <label
                htmlFor="dropzone_file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                  <p className="custom-bold-font text-[18px] mb-2 text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      অভিযোগ সংক্রান্ত প্রমাণাদি(যদি থাকে)
                    </span>{" "}
                  </p>
                  <p className="custom-font text-[14px] text-gray-500 dark:text-gray-400">
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
            <div className="w-full mb-4 bg-white dark:bg-gray-700 dark:border-gray-600">
              <div>
                <label
                  htmlFor="complainer_info"
                  className="custom-font md:text-[18px] block mb-2 font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 custom-font rounded-lg focus:ring-black-500 focus:border-black-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500 dark:focus:border-black-500"
                  placeholder="নাম, মোবাইল নাম্বার, ঠিকানা..."
                ></input>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                name="hide_info"
                onChange={() => setHideInfo(!hideInfo)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
              <label
                htmlFor="default-checkbox"
                className="custom-font md:text-[18px] ms-2 font-medium text-gray-900 dark:text-gray-300"
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

            <div className="w-full">
              <Autocomplete
                disablePortal
                options={offices}
                getOptionLabel={(option) => option.name_Bn || ""}
                onChange={(event, newValue) => setSelectedOffice(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <span className="custom-font">দপ্তর নির্বাচন করুন</span>
                    }
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </div>

            <div className="mt-6 border border-gray-200/80 bg-gray-100/60 rounded-md p-3">
              {/* <LoadCanvasTemplate /> */}
              <div className="mb-2 flex gap-3">
                <LoadCanvasTemplateNoReload />

                <img src={reloadimg} alt="reload-captcha-image" className="w-9 h-9" onClick={()=>reloadCaptcha()} />
              </div>
              <input
                type="text"
                className="border border-gray-400 rounded-sm"
                placeholder="Enter Captcha Value"
                onChange={handleCaptchaChange}
                required
              />
              {captchaError && (
                <span className="text-red-500">Captcha is incorrect. Please try again.</span>
              )}
            </div>

            <div className="flex items-center justify-end py-2 dark:border-gray-600 mt-5">
              <button
                type="submit"
                className="custom-bold-font md:text-[16px] py-3.5 px-4 text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 w-full text-center"
              >
                অভিযোগ দাখিল করুন
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

// Define PropTypes for ComplainForm
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
};

export default ComplainForm;
