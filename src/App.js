import React from 'react';
import marked from "marked";
import "./App.scss";
import initTxt from "./initTxt"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";
 
const projectName = "markdown-previewer";

// allows line breaks with return button
marked.setOptions({
    breaks: true
})

// inserts target="_blank" into href tags
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a></a>`;
 

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: initTxt,
            editorMaximized: false,
            previewMaximized: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
        this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }

    handleChange(e) {
        this.setState({markdown: e.target.value})
    }

    handleEditorMaximize() {
        this.setState({editorMaximized: !this.state.editorMaximized});
    }

    handlePreviewMaximize() {
        this.setState({previewMaximized: !this.state.previewMaximized})
    }

    render() {  
        const classes = this.state.editorMaximized ?
            [
                "editorWrap maximized",
                 "previewWrap hide",
                 faCompress
            ] :
            this.state.previewMaximized ?
            [
                "editorWrap hide",
                "previewWrap maximized",
                faCompress
            ] :
            [
                "editorWrap",
                "previewWrap",
                faArrowsAlt
            ];

        return (
            <div>
                <div className={classes[0]}>
                    <Toolbar
                        icon={classes[2]}
                        onClick={this.handleEditorMaximize}
                        text="Editor" />
                    <Editor markdown={this.state.markdown}
                        onChange={this.handleChange} />
                </div>
                <div className="converter">
                </div>
                <div className={classes[1]}>
                    <Toolbar 
                        icon={classes[2]}
                        onClick={this.handlePreviewMaximize}
                        text="Previewer" />
                    <Preview markdown={this.state.markdown} />
                </div>
            </div>
        )
    }
}

const Toolbar = (props) => 
    <div className="toolbar">
        <FontAwesomeIcon className="faFreeCodeCamp" icon={faFreeCodeCamp} /> 
        {props.text}
        <FontAwesomeIcon icon={props.icon} onClick={props.onClick} />
    </div>

const Editor = (props) => 
    <textarea id="editor"
        value={props.markdown}
        onChange={props.onChange}
        type="text"  
    /> 

const Preview = (props) => 
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />


export default App;
