// src/contexts/FormContext.tsx
import { createState, createEffect} from "./reactive.js";
import { addform, deleteform, getform, loadforms, updateform } from "../lib/storage.js";
import { useAppState } from "../lib/state.jsx";
import { useAuth } from "./AuthContext.jsx";
import { nanoid } from "nanoid";

export const useFormContext = () => {
  const { state } = useAppState();
  const { user } = useAuth();
  const { selectedWebsiteId } = state;

  const initForm = { formId: "" };

  const [selectedFormId, setSelectedFormId] = createState(null);
  const [formdata, setFormData] = createState(initForm);
  const [refformData, setRefformData] = createState(initForm);
  const [canSave, setCanSave] = createState(false);
  const [selectedContent, setSelectedContent] = createState("AvailableForms");
  const [formslist, setFormsList] = createState([]);
  const [selectedFormType, setSelectedFormType] = createState(null);
  const [selectedTemplate, setSelectedTemplate] = createState(null);

  const [FormTemplates, setFormTemplates] = createState([
    { name: "productform", type: "dynamic" },
    { name: "blog", type: "dynamic" },
  ]);

  const generateNextformId = () => `P${nanoid()}`;

  createEffect(() => {
    if (!user()?.email || !selectedWebsiteId || !selectedTemplate()) {
      setFormsList([]);
      return;
    }
    const forms = loadforms(user()?.email || "");
    const list = forms[selectedWebsiteId]?.[selectedTemplate()] || [];
    setFormsList(list);
  }, [selectedTemplate, selectedWebsiteId]);

  createEffect(() => {
    if (!user()?.email || !selectedWebsiteId) {
      setFormData(initForm);
      setRefformData(initForm);
      return;
    }

    if (selectedFormId() === "" && selectedFormId() !== null) {
      const newformId = generateNextformId();
      setFormData({ ...initForm, formId: newformId });
      setRefformData({ ...initForm, formId: newformId });
    } else if (selectedFormId() !== null) {
      const form = getform(
        user()?.email || "",
        selectedWebsiteId,
        selectedTemplate(),
        selectedFormId()
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
  }, [selectedFormId, selectedTemplate, selectedWebsiteId]);

  createEffect(() => {
    setCanSave(JSON.stringify(formdata()) !== JSON.stringify(refformData()));
  }, [formdata, refformData]);

  // ----- Handlers -----
  const handleAddForm = () => {
    if (!selectedTemplate()) return alert("Please select a template first.");
    setSelectedFormId("");
    setSelectedContent("Form");
  };

  const handleDeleteForm = (formId) => {
    if (!user()?.email || !selectedWebsiteId) return;
    if (!window.confirm(`Are you sure you want to delete "${formId}"?`)) return;

    const success = deleteform(
      user()?.email || "",
      selectedWebsiteId,
      selectedTemplate(),
      formId
    );

    if (success) {
      if (selectedFormId() === formId) setSelectedFormId(null);
      const forms = loadforms(user()?.email || "");
      setFormsList(forms[selectedWebsiteId]?.[selectedTemplate()] || []);
    } else {
      alert("Failed to delete Form. Please try again.");
    }
  };

  const handleFormClick = (formId) => setSelectedFormId(formId);

  const handleSave = () => {
    if (!user()?.email || !selectedWebsiteId || !selectedTemplate()) return;

    if (selectedFormId() === "") {
      const newform = { ...formdata() };
      const success = addform(
        user()?.email || "",
        selectedWebsiteId,
        selectedTemplate(),
        newform
      );
      if (success) {
        setSelectedFormId(newform.formId);
        setFormData(newform);
        setRefformData(newform);
        const forms = loadforms(user()?.email || "");
        setFormsList(forms[selectedWebsiteId]?.[selectedTemplate()] || []);
        setCanSave(false);
      } else {
        alert("Form name already exists.");
      }
    } else {
      const success = updateform(
        user()?.email || "",
        selectedWebsiteId,
        selectedFormId(),
        selectedTemplate(),
        formdata()
      );
      if (success) {
        setRefformData(formdata());
        setCanSave(false);
      } else {
        alert("Failed to update form.");
      }
    }
  };

  const handleDiscard = () => {
    if (canSave() && !window.confirm("Discard changes?")) return;
    setFormData(refformData());
    setCanSave(false);
  };

  const handleBack = () => {
    if (canSave() && !window.confirm("You have unsaved changes. Are you sure?")) return;

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
        const template = FormTemplates().find(t => t.name === selectedTemplate());
        if (template?.type === "dynamic") {
          setSelectedContent("FormTable");
        } else {
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

  return{
    selectedFormId, setSelectedFormId,
    formdata, setFormData,
    canSave,
    selectedContent, setSelectedContent,
    handleAddForm,
    handleDeleteForm,
    handleFormClick,
    handleSave,
    handleDiscard,
    handleBack,
    FormTemplates,
    selectedTemplate, setSelectedTemplate,
    selectedFormType, setSelectedFormType,
    formslist, setFormsList
  };

}

