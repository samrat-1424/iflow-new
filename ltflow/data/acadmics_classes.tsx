export interface ClassItem {
    id: string;
    title: string;
    disabled?: boolean;
  }
  
  const classes: ClassItem[] = [
    { id: "pp_1", title: "Early years-I (Pre Primary I)" },
    { id: "pp_2", title: "Early years-II (Pre Primary II)" },
    { id: "pp_3", title: "Early years-III (Pre Primary III)" },
    { id: "class_1", title: "Class I" },
    { id: "class_2", title: "Class II" },
    { id: "class_3_5", title: "Class IV - V" },
    { id: "class_6_8", title: "Class VI - VIII" },
    { id: "class_9", title: "Class IX" },
    { id: "class_10", title: "Class X" },
    { id: "class_11", title: "Class XI" },
    { id: "class_12", title: "Class XII" }
  ];
  
  export default classes;