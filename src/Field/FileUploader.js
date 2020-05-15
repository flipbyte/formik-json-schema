import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { changeHandler } from '../utils';

const Thumb = ({ key, file }) => <div />

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
}

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
}

const baseStyle = {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: 10
}

const activeStyle = {
    borderColor: '#6c6',
    backgroundColor: '#eee'
}

const acceptStyle = {
    borderColor: '#00e676'
}

const rejectStyle = {
    borderColor: '#ff1744'
}

const prepareFileUploderOptions = ({ onDrop, onDropAccepted, onDropRejected, ...options }, formik, config) => {
    options.onDrop = onDrop ? onDrop.bind(this, formik, config) : null;
    options.onDropAccepted = onDropAccepted ? onDropAccepted.bind(this, formik, config) : null;
    options.onDropRejected = onDropRejected ? onDropRejected.bind(this, formik, config) : null;

    return options;
}

const FileUploader = ({ config, formik, value, error }) => {
    const {
        name,
        options,
        placeholder,
        disabledText,
        zoneActiveText,
        hasThumbs = false
    } = config;
    const { setFieldValue } = formik;
    const selectedValue = value;
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ ...prepareFileUploderOptions({ ...options }, formik, config) });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    return (
        <section>
            <div { ...getRootProps({ style }) }>
                <input { ...getInputProps() } />
                { isDragActive
                    ? <p>Drop the files here ...</p>
                    : <p>Drag 'n' drop some files here, or click to select files</p>
                 }
            </div>
            <aside style={ thumbsContainer }>
                { value && (hasThumbs ? value.map(file => (
                    <div style={ thumb } key={ file.id }>
                        <div style={ thumbInner }>
                            <img src={ file.url } alt={ file.label } style={ img } />
                        </div>
                    </div>
                )) : <ul>{ value.map(file => <li key={ file.id }>{ file.url }</li>) }</ul> )}
            </aside>
        </section>
    );
}

export default React.memo(FileUploader)
