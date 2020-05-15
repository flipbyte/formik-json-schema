import _ from 'lodash';
import { connect } from 'formik';
import React, { useEffect, useState } from 'react';
import ElementRenderer from './Renderer';
import { FIELD } from './registry';
import shallowequal from 'shallowequal';

const Element = ({ config, update, formik }) => {
    const { configSource, dataSource } = config;
    const [ hasLoadedConfig, setHasLoadedConfig ] = useState(false);
    const [ hasLoadedData, setHasLoadedData ] = useState(dataSource ? false : true);
    const [ hasMounted, setHasMounted ] = useState(update !== false);
    const [ loadedConfig, setLoadedConfig ] = useState(undefined);

    /**
     * After load data
     *
     * @param  {mixed} value
     * @return {void}
     */
    const loadDataAfter = (value) => setHasLoadedData(true);

    /**
     * After load config
     *
     * @param  {object} newConfig
     * @return {void}
     */
    const loadConfigAfter = (newConfig) => {
        setHasLoadedConfig(true);
        setLoadedConfig(_.assign({}, config, newConfig))
    };

    /**
     * On mount, load if there is a valid config source,
     * load the data from the config source and handle
     * whether future loads should be possible
     */
    useEffect(() => {
        if (!hasLoadedConfig && typeof configSource === 'function') {
            configSource(formik, config).then(loadConfigAfter).catch((err) => {});
        }

        return () => setHasLoadedConfig(false);
    }, []);

    /**
     * If the value of update changes or if the form is currently validating (during submission),
     * set that value for hasMounted => true
     */
    useEffect(() => {
        setHasMounted((hasMounted) => {
            if (hasMounted) {
                return hasMounted;
            }

            return update !== false || formik.isValidating === true;
        });
    }, [ update, formik.isValidating ]);

    /**
     * If a valid dataSource exists, call the dataSource when the element is mounted.
     * Also, call this when initialValues have changed and the component is mounted
     *
     * The latter is useful when you update the data on the server and reinitialize the
     * values of the form top-down where the value of this particular field comes from a dataSource
     */
    useEffect(() => {
        if (typeof dataSource === 'function' && hasMounted) {
            dataSource(formik, config).then(loadDataAfter).catch((err) => {});
        }
    }, [ hasMounted, formik.initialValues ]);

    return hasMounted && (
        <ElementRenderer config={ loadedConfig || config } formik={ formik } />
    );
}

export default connect(
    React.memo(Element, ({ config, formik, update }, nextProps) => (
        update === nextProps.update
        && shallowequal(config, nextProps.config)
        && formik.initialValues === nextProps.formik.initialValues
        && formik.isValidating === nextProps.formik.isValidating
        && formik.isSubmitting === nextProps.formik.isSubmitting
    ))
);
