import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];

const modules = {
    toolbar: toolbarOptions,
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

type Props = {
    register: any;
    setValue: any;
    watch: any;
    registerValue: string;
};

const DescriptionEditor = ({ register, registerValue, setValue, watch }: Props) => {
    // const { register, setValue, watch } = useForm();

    useEffect(() => {
        register(registerValue, { required: true, minLength: 11 });
    }, [register]);

    const onEditorStateChange = (editorState: any) => {
        setValue(registerValue, editorState);
    };

    const editorContent = watch(registerValue);

    return (
        <div>
            <QuillNoSSRWrapper
                placeholder="Mô tả..."
                modules={modules}
                value={editorContent}
                onChange={onEditorStateChange}
                theme="snow"
            />
        </div>
    );
};

export default DescriptionEditor;
