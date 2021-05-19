import { Repository } from "@interfaces/Repositories";

interface IFields {
    readonly repository: Repository;
    readonly data: object;

    runFields(data: any, repo?: any, struct?: string): boolean | Array<string | object>;
}

class Fields implements IFields {

    constructor(
        readonly repository: Repository,
        readonly data: object,
    ) { };

    runFields(data?: any, repo?: any, struct?: string): boolean | Array<string | object> {
        repo = repo || this.repository;
        data = data || this.data;

        let missingFields: Array<string | object> = [];
        for (const repoKey in repo) {
            if (repo[repoKey] !== null && repo[repoKey] !== undefined && typeof repo[repoKey].filter !== 'function' && typeof repo[repoKey].maxLength !== 'number') {
                const valid = this.runFields(data[repoKey], repo[repoKey], `${struct !== undefined ? `${struct}.` : ''}${repoKey}`)

                if (valid !== true) {
                    const missingFieldsValid = <Array<string | object>>valid;
                    missingFields = [
                        ...missingFields,
                        ...missingFieldsValid,
                    ];
                }
            }

            const arrayWithTheMissingField = (arr: Array<string | object>, missingField: string, failMessage?: string) => {

                let array = [
                    ...arr,
                ];
                const field = `${struct !== undefined ? `${struct}.` : ''}${missingField}`;
                if (failMessage) {
                    array.push({
                        field,
                        message: failMessage,
                    })
                } else {
                    array.push(field);
                }

                return array;
            }


            const dataValue = data[repoKey];
            if (repo[repoKey] === null && !dataValue || ((!dataValue || dataValue.length <= 0) ? true : false)) {
                missingFields = arrayWithTheMissingField(missingFields, repoKey);
            } else if (repo[repoKey] && repo[repoKey].maxLength && repo[repoKey].maxLength !== null && Number.isInteger(repo[repoKey].maxLength)) {
                if (dataValue.length > repo[repoKey].maxLength) {
                    missingFields = arrayWithTheMissingField(
                        missingFields,
                        repoKey,
                        `The max length for this field is ${repo[repoKey].maxLength} characters!`
                    );
                }
            } else if (repo[repoKey] && repo[repoKey].filter && repo[repoKey].filter !== null && typeof repo[repoKey].filter === 'function') {
                if (!repo[repoKey].filter(dataValue || '')) {
                    missingFields = arrayWithTheMissingField(missingFields, repoKey, repo[repoKey].filterFailMessage);
                }
            }
        }

        if (missingFields.length > 0) return missingFields;
        return true;
    }
}

export default Fields;