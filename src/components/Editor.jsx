import MDEditor from "@uiw/react-md-editor"

export default function Editor({ currentNote, updateNote }) {

    return (
        <section className="pane editor">
            <MDEditor
                value={currentNote.body}
                onChange={updateNote}
                height="90vh"
                style={{minHeight: "50vh"}}
            />
            {/* <MDEditor.Markdown source={currentNote.body} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </section>
    )
}
