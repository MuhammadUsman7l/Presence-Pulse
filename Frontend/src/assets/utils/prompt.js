import Swal from "sweetalert2";

const errorPropmt = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};

const successPrompt = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export { errorPropmt, successPrompt };
