import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomEditor = ({ description, setFieldValue }) => {
  return (
    <ReactQuill
      theme="snow"
      value={description}
      onChange={(value)=>setFieldValue('description',value)}
      style={{ height: "200px", borderRadius: "10px" }}
    />
  );
};

export default CustomEditor;
