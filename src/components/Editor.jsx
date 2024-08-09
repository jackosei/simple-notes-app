import MDEditor from "@uiw/react-md-editor"

export default function Editor({ tempNoteText, setTempNoteText }) {

    return (
        <section className="pane editor">
            <MDEditor
                value={tempNoteText}
                onChange={setTempNoteText}
                height="90vh"
                style={{ minHeight: "50vh" }}
            />
            {/* <MDEditor.Markdown source={currentNote.body} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </section>
    )
}
