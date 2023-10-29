"use server";
import { fileURLToPath } from 'url';
// import { path } from 'path';

const execSync = require('child_process').execSync;
const path = require('path');
const __approot : string = path.resolve(__dirname).split('/.next')[0];
const __feeds : string = __approot + "/feeds";

export async function serverAction(req: Array<string>) {
    const cpes_array: Array<string> = [];

    const output_nvdsync = execSync(`nvdsync -v=1 -cve_feed=cve-1.1.json.gz ${__feeds}`, { shell: '/bin/bash', encoding: 'utf-8' });
    const output_rpm2cpe = execSync(`rpm2cpe -rpm=1 -cpe=2 -e=1 << EOF ${req.join("\n")}\nEOF`, { shell: '/bin/bash', encoding: 'utf-8' });
    const splitted_output_rpm2cpe = output_rpm2cpe.replace(/\:alt.*\n/gi, '\n');
    const output_cpe2cve = execSync(`cpe2cve -cpe 1 -e 1 -cve 1 ${__feeds}/nvdcve-1.1-*.json.gz << EOF ${splitted_output_rpm2cpe}\nEOF`, { shell: '/bin/bash', encoding: 'utf-8' });
    const splitted = output_cpe2cve.split(/\r?\n/);
    const filtered = splitted.filter( (e: string) => {
      return e !== '';
    })
    console.log(filtered);

    return(cpes_array);
}