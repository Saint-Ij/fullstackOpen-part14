import { createNewBlog } from "@/app/actions/blogs";
const newBlog = () => {
  return (
    <form style={formStyles} action={createNewBlog}>
      <label>
        Title: <input type="text" name="title" />
      </label>
      <label>
        Author: <input type="text" name="author" />
      </label>
      <label>
        Url: <input type="text" name="url" />
      </label>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

const formStyles: React.CSSProperties = {
  margin: "5px",
  display: "flex",
  gap: "7px",
  flexDirection: "column",
};

const buttonStyle: React.CSSProperties = {
  width: "100px",
};

export default newBlog;
