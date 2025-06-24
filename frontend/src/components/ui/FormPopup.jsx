import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import TimerProgressCircle from "./TimerProgressCircle"; // Adjust path if needed
import SuccessAlert from "./SuccessAlert";

const FormPopup = ({ isEdit, handleClose, children, success, error }) => {


    return (
        <div className="pb-5 fixed bottom-0 right-5 z-10 w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-zinc-800 dark:border-zinc-700">
            <div className="max-h-[calc(100vh-120px)] overflow-y-auto w-full relative">
                <div>
                    <div className="flex justify-between bg-neutral-800 py-3 px-3 rounded-t-lg sticky top-0 z-10 left-0">
                        <h2 className="text-neutral-50 font-semibold">
                            {isEdit ? "Edit Category" : "Create Category"}
                        </h2>
                        <button
                            className="text-neutral-50"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <FiX />
                        </button>
                    </div>



                    {error && (
                        <div className="px-3 py-2 mx-4 mt-4 bg-pink-50 border border-red-400 rounded-md text-red-600 flex items-center gap-3">
                            <p>{error}</p>
                        </div>
                    )}
                    {success ? (
                        <SuccessAlert
                            message={success}
                            duration={4000}
                            onClose={handleClose}
                        />
                    ) : (
                        <div className="p-4">{children}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormPopup;
