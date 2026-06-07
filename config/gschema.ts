import { defineSchemaList, Schema } from "gnim-schemas"

const id = import.meta.domain || "@domain@"
const path = `/${id.replaceAll(".", "/")}/`

export const appSchema = new Schema({ id, path })
  //
  .key("string-key", "s", {
    default: "Hello World!",
    summary: "String to display",
  })

export default defineSchemaList([appSchema])
