export interface validateOptions {
    [key: string]: string[]
}

export const firstFail = (errors: validateOptions): string => {
    const firstKey = Object.keys(errors)[0]
    return errors[firstKey][0]
}