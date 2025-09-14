// src/contexts/FormContext.tsx
import {
  createContext,
  useContext,
  type JSX,
  createSignal,
  createEffect,
  onCleanup
} from "solid-js";
import { addform, deleteform, getform, loadforms, updateform } from "../lib/storage";
import { useAppState } from "../lib/state";
import { useAuth } from "./AuthContext";
import { nanoid } from "nanoid";

export interface FormData {
  formId: string;
  [key: string]: any;
}

interface WebsiteData {
  complete_unique_id: string;
  subdomain: string;
}

interface User {
  email: string;
  websites: WebsiteData[];
}

interface ContextType {
  user: () => User | null;
  selectedFormId: () => string | null;
  setSelectedFormId: (id: string | null) => void;
  formdata: () => FormData | undefined;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  canSave: () => boolean;
  FormTemplates: typeof FormTemplates;
  selectedTemplate: () => string | null;
  setSelectedTemplate: (name: string | null) => void;
  formslist: () => FormData[];
  setFormsList: (list: FormData[]) => void;
  selectedFormType: () => string | null;
  setSelectedFormType: (type: string | null) => void;

  selectedContent: () => string;
  setSelectedContent: (view: string) => void;
  handleAddForm: () => void;
  handleDeleteForm: (formId: string) => void;
  handleFormClick: (formId: string) => void;
  handleSave: () => void;
  handleDiscard: () => void;
  handleBack: () => void;

  iframeEl: () => HTMLIFrameElement | null;
  setIframeEl: (el: HTMLIFrameElement | null) => void;
}

type Section = {
  sectionName: string;
  data?: Record<string, unknown>;
  sections?: Section[];
};


export const FormTemplates = [
  { name: "productform", type: "Multi Entry Form" },
  { name: "blog", type: "Multi Entry Form" }
];

const FormTemplatessections={
  productform:[
    {
      sectionName: "TextField",
      data: {
        builddata: {
          label: "Full Name",
          name: "fullName",
          placeholder: "Enter your name",
          type: "text",
        },
        styles: {},
        state: {
          key: "fullName",
          type: "string",
          initValue: "",
        },
      },
      sections: [],
    },
    {
      sectionName: "TextField",
      data: {
        builddata: {
          label: "Email Address",
          name: "email",
          placeholder: "Enter your email",
          type: "email",
        },
        styles: {},
        state: {
          key: "email",
          type: "string",
          initValue: "",
        },
      },
      sections: [],
    },
  ],
  blog:[
    {
      sectionName: "TextField",
      data: {
        builddata: {
          label: "blogName",
          name: "Name",
          placeholder: "Enter your blogname",
          type: "text",
        },
        styles: {},
        state: {
          key: "Name",
          type: "string",
          initValue: "",
        },
      },
      sections: [],
    },
    {
      sectionName: "TextField",
      data: {
        builddata: {
          label: "Full Name",
          name: "fullName",
          placeholder: "Enter your name",
          type: "text",
        },
        styles: {},
        state: {
          key: "fullName",
          type: "string",
          initValue: "",
        },
      },
      sections: [],
    },
    {
      sectionName: "TextField",
      data: {
        builddata: {
          label: "Email Address",
          name: "email",
          placeholder: "Enter your email",
          type: "email",
        },
        styles: {},
        state: {
          key: "email",
          type: "string",
          initValue: "",
        },
      },
      sections: [],
    }
  ]
}

const FormContext = createContext<ContextType>();
export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
};

export const FormProvider = (props: { children: JSX.Element }) => {
  const { state } = useAppState();
  const { user } = useAuth();

  const initForm: FormData = { formId: "" };

  const [selectedFormId, setSelectedFormId] = createSignal<string | null>(null);
  const [formdata, setFormData] = createSignal<FormData>(initForm);
  const [refformData, setRefformData] = createSignal<FormData>(initForm);
  const [canSave, setCanSave] = createSignal(false);
  const [selectedContent, setSelectedContent] = createSignal<string>("AvailableForms");
  const [formslist, setFormsList] = createSignal<FormData[]>([]);
  const [selectedFormType, setSelectedFormType] = createSignal<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = createSignal<string | null>(null);
  const [selectedFormTemplateSection,setselectedFormTemplateSection] =  createSignal<Section[]>([]);
  // iframe signal
  const [iframeEl, setIframeEl] = createSignal<HTMLIFrameElement | null>(null);

  const generateNextformId = () => `P${nanoid()}`;

  // ---------- Effects ----------
  createEffect(() => {
    if (!user()?.email || !state.selectedWebsiteId || !selectedTemplate()) {
      setFormsList([]);
      return;
    }
    const forms = loadforms(user()?.email || "");
    const list = forms[state.selectedWebsiteId]?.[selectedTemplate()!] || [];
    setFormsList(list);
  });

  createEffect(() => {
    if (!user()?.email || !state.selectedWebsiteId) {
      setFormData(initForm);
      setRefformData(initForm);
      return;
    }
    if (selectedFormId() === "" && selectedFormId() !== null) {
      const newformId = generateNextformId();
      console.log(newformId)
      setFormData({ ...initForm, formId: newformId });
      setRefformData({ ...initForm, formId: newformId });
    } else if (selectedFormId() !== null) {
      const form = getform(
        user()?.email || "",
        state.selectedWebsiteId,
        selectedTemplate()!,
        selectedFormId()!
      );
      if (form) {
        setFormData(form);
        setRefformData(form);
        setSelectedContent("Form");
      } else {
        setFormData(initForm);
        setRefformData(initForm);
      }
    }
    setCanSave(false);
  });

  createEffect(() => {
    setCanSave(JSON.stringify(formdata()) !== JSON.stringify(refformData()));
  });
  createEffect(() => {
    if (selectedContent() === "Form") {
      if (!iframeEl()) {
        const iframe = document.createElement("iframe");
        iframe.src = "http://localhost:5173";
        iframe.className = "w-full h-[600px] border rounded";
        document.body.appendChild(iframe);
        setIframeEl(iframe);
      }
    }
    if (selectedContent() === "FormTable") {
      setselectedFormTemplateSection(
        selectedTemplate()
          ? FormTemplatessections[selectedTemplate() as keyof typeof FormTemplatessections]
          : []
      );
    }
  });
  
  // ---------- Two-way communication ----------
  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== "http://localhost:5173") return; // security check
    const { type, payload } = event.data || {};
  
    if (type === "iframe:ready") {
      // ✅ Only now send init data
      iframeEl()?.contentWindow?.postMessage(
        { type: "form:init", payload: { formdata: formdata(),formtemplate:selectedFormTemplateSection(), user: user() } },
        "http://localhost:5173"
      );
    }
  
    if (type === "form:update" && payload?.fieldName) {
      console.log(
        "Main app received field update from iframe:",
        payload.fieldName,
        payload.value
      );
    
      setFormData((prev) => ({
        ...prev,
        [payload.fieldName]: payload.value,
      }));
    }
    
  };

  createEffect(() => {
    window.addEventListener("message", handleMessage);
    onCleanup(() => window.removeEventListener("message", handleMessage));
  });

  // ---------- Handlers ----------
  const handleAddForm = () => {
    if (!selectedTemplate()) {
      alert("Please select a template first.");
      return;
    }
    setSelectedFormId("");
    setSelectedContent("Form");
  };

  const handleDeleteForm = (formId: string) => {
    if (!user()?.email || !state.selectedWebsiteId) return;
    if (window.confirm(`Are you sure you want to delete "${formId}"?`)) {
      const success = deleteform(
        user()?.email || "",
        state.selectedWebsiteId,
        selectedTemplate()!,
        formId
      );
      if (success) {
        if (selectedFormId() === formId) setSelectedFormId(null);
        const forms = loadforms(user()?.email || "");
        setFormsList(forms[state.selectedWebsiteId]?.[selectedTemplate()!] || []);
      } else alert("Failed to delete Form. Please try again.");
    }
  };

  const handleFormClick = (formId: string) => setSelectedFormId(formId);

  const handleSave = () => {
    if (!user()?.email || !state.selectedWebsiteId || !selectedTemplate()) return;
    if (selectedFormId() === "") {
      const newform = { ...formdata() };
      const success = addform(
        user()?.email || "",
        state.selectedWebsiteId,
        selectedTemplate()!,
        newform
      );
      if (success) {
        setSelectedFormId(newform.formId);
        setFormData(newform);
        setRefformData(newform);
        const forms = loadforms(user()?.email || "");
        setFormsList(forms[state.selectedWebsiteId]?.[selectedTemplate()!] || []);
        setCanSave(false);
      } else alert("Form name already exists.");
    } else {
      const success = updateform(
        user()?.email || "",
        state.selectedWebsiteId,
        selectedFormId()!,
        selectedTemplate()!,
        formdata()
      );
      if (success) {
        setRefformData(formdata());
        setCanSave(false);
      } else alert("Failed to update form.");
    }
  };

  const handleDiscard = () => {
    if (canSave() && !window.confirm("Discard changes?")) return;
    setFormData(refformData());
    setCanSave(false);
  };

  const handleBack = () => {
    if (canSave() && !window.confirm("You have unsaved changes. Are you sure you want to go back?")) return;
    setFormData(initForm);
    setCanSave(false);
    setSelectedFormId(null);

    switch (selectedContent()) {
      case "FormTable":
        setSelectedContent("AvailableForms");
        setSelectedFormType("");
        setSelectedTemplate("");
        break;
      case "Form":
        const template = FormTemplates.find((t) => t.name === selectedTemplate());
        if (template?.type === "dynamic") setSelectedContent("FormTable");
        else {
          setSelectedContent("AvailableForms");
          setSelectedFormType("");
          setSelectedTemplate("");
        }
        break;
      default:
        setSelectedContent("AvailableForms");
        setSelectedFormType("");
        setSelectedTemplate("");
        break;
    }
  };

  return (
    <FormContext.Provider
      value={{
        user,
        selectedFormId,
        setSelectedFormId,
        formdata,
        setFormData,
        canSave,
        selectedContent,
        setSelectedContent,
        handleAddForm,
        handleDeleteForm,
        handleFormClick,
        handleSave,
        handleDiscard,
        handleBack,
        FormTemplates,
        selectedTemplate,
        setSelectedTemplate,
        selectedFormType,
        setSelectedFormType,
        formslist,
        setFormsList,
        iframeEl,
        setIframeEl
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
