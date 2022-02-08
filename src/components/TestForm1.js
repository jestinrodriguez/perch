// // import React from "react";

// // const Form = () => {
// //   function handleForm(ev) {
// //     ev.preventDefault(); //stop the page reloading
// //     //console.dir(ev.target);
// //     let myForm = ev.target;
// //     // let fd = new FormData(myForm);

// //     console.log(myForm);

// //     //look at all the contents
// //     // for (let key of fd.keys()) {
// //     //   console.log(key, fd.get(key));
// //     // }
// //     // let json = convertFD2JSON(fd);
// //   }

// //   //   function convertFD2JSON(formData) {
// //   //     let obj = {};
// //   //     for (let key of formData.keys()) {
// //   //       obj[key] = formData.get(key);
// //   //     }
// //   //     return JSON.stringify(obj);
// //   //   }

// //   return (
// //     <>
// //       <form action='#' id='myForm'>
// //         <fieldset>
// //           <legend>Registration</legend>
// //           <div className='formBox'>
// //             <label for='first'>First Name</label>
// //             <input
// //               type='text'
// //               id='first'
// //               name='first'
// //               autocomplete='off'
// //               autocapitalize='on'
// //             />
// //           </div>
// //           <div className='formBox'>
// //             <label for='last'>Last Name</label>
// //             <input
// //               type='text'
// //               id='last'
// //               name='last'
// //               required
// //               autocomplete='off'
// //               autocapitalize='on'
// //             />
// //           </div>
// //           <div className='formBox'>
// //             <label for='email'>Email</label>
// //             <input
// //               type='email'
// //               id='email'
// //               name='email'
// //               required
// //               autocomplete='off'
// //             />
// //           </div>
// //           <div className='formBox'>
// //             <label for='pass'>Password</label>
// //             <input
// //               type='password'
// //               id='pass'
// //               name='pass'
// //               required
// //               autocomplete='off'
// //             />
// //           </div>
// //           <div className='formBox'>
// //             <label for='spam'>I love spam</label>
// //             <input type='checkbox' id='spam' name='spam' checked />
// //           </div>
// //           <div className='formBox'>
// //             <button onClick={handleForm}>Send</button>
// //           </div>
// //         </fieldset>
// //       </form>
// //     </>
// //   );
// // };

// // export default Form;

// // // import { TextField } from "material-ui";
// // // import React, { useState } from "react";
// // // import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// // // export default function App() {
// // //   const [value, setValue] = useState("");

// // //   return (
// // //     <MuiThemeProvider>
// // //       <div>
// // //         <TextField
// // //           value={value}
// // //           onChange={(e) => {
// // //             setValue(e.target.value);
// // //           }}
// // //         />
// // //       </div>
// // //     </MuiThemeProvider>
// // //   );
// // // }

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const tableData = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

import React from "react";
import Form from "@rjsf/antd";
import { data } from "../data/structure";
import "antd/dist/antd.css";

const TestForm1 = ({ setDataLoaded, setFormData }) => {
  const handleForm = (e) => {
    // console.log(e);
    setFormData(e.formData);
    // e.preventDefault();
    setDataLoaded(true);
  };

  const schema = {
    title: "Compensation Structure",
    type: "object",
    required: [],
    properties: {
      levels: {
        title: "Level",
        type: "array",
        items: {
          title: "Level1",
          type: "object",
          properties: {
            tiers: {
              type: "array",
              title: "Tiers",
              items: {
                type: "object",
                properties: {
                  from: {
                    type: "number",
                    title: "From",
                  },
                  rate: {
                    type: "number",
                    title: "Rate",
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const testSchema = {
    title: "Custom array of strings",
    type: "array",
    items: {
      type: "string",
    },
  };

  const uiSchema = {
    levels: {
      items: {
        tiers: {
          "ui:options": {
            removable: true,
            orderable: false,
          },
        },
      },
      "ui:options": {
        removable: true,
        orderable: false,
      },
    },
  };

  return (
    <div styles={{ padding: 10 }}>
      <Form
        styles={{ padding: 10, backgroundColor: "blue" }}
        schema={schema}
        // onChange={console.log("changed")}
        onSubmit={handleForm}
        // onError={console.log("error")}
        // uiSchema={uiSchema}
        // formData={data}
        uiSchema={uiSchema}
      />
    </div>
  );
};

export default TestForm1;
