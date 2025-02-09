import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#0a373b] focus:ring-2 focus:ring-[#0a373b]"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#0a373b] focus:ring-2 focus:ring-[#0a373b]">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="rounded-md border border-gray-300 bg-white shadow-md">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem
                      key={optionItem.id}
                      value={optionItem.id}
                      className="hover:bg-gray-100"
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#0a373b] focus:ring-2 focus:ring-[#0a373b]"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-[#0a373b] focus:ring-2 focus:ring-[#0a373b]"
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-2" key={controlItem.name}>
            <Label className="text-[#0a373b] font-medium">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-6 w-full bg-[#0a373b] text-white font-semibold py-3 rounded-md hover:bg-[#085c5c] transition duration-300 disabled:bg-gray-400"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
