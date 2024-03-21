"use server";
import { fileURLToPath } from 'url';
const axios = require('axios')
const FormData = require('form-data')
const { Readable } = require('stream');

const execSync = require('child_process').execSync;
const path = require('path');
const readline = require('readline');
const __approot : string = path.resolve(__dirname).split('/.next')[0];
const __feeds : string = __approot + "/feeds";

export async function serverAction(req: Array<string>, years: string[]) {
    const path_to_cve_jsons_array: Array<string> = [];
    for (var year of years) {
      path_to_cve_jsons_array.push(`${__feeds}/nvdcve-1.1-${year}.json.gz`);
    }
    const output_rpm2cpe = execSync(`rpm2cpe -rpm 1 -cpe 2 -e 1 << EOF ${req.join("\n")}\nEOF`, { shell: '/bin/bash', encoding: 'utf-8' });
    const updated_output_rpm2cpe: Array<string> = [];
    for (var cpe of output_rpm2cpe.split('\n')) {
      if (cpe != '') {
        updated_output_rpm2cpe.push(cpe.split(':').slice(0, 5).join(":"));
      }
    }
    const output_cpe2cve = execSync(`cpe2cve -cpe 1 -e 1 -cve 1 ${path_to_cve_jsons_array.join(" ")} << EOF\n${updated_output_rpm2cpe.join("\n")}\nEOF`, { shell: '/bin/bash', encoding: 'utf-8' });
    console.log(output_cpe2cve)
    const splitted = output_cpe2cve.split(/\r?\n/);
    const filtered = splitted.filter( (e: string) => {
      return e !== '';
    }).filter( (e: string) => {
      return e !== "CVE-2021-45967"
    });
    return(filtered.toString());
}

export async function getYearRangeNvdCve() {
  const years_array: Array<string> = [];
  const output_rpm2cpe = execSync(`ls ${__feeds}/*.json.gz`, { shell: '/bin/bash', encoding: 'utf-8' });
  for (var cve_json of output_rpm2cpe.split(/\r?\n/)) {
    const year: string = cve_json.split("-").at(-1).split(".")[0];
    if (year.length == 4)
    {
      years_array.push(year);
    }
  }
  return(years_array);
}

export const sss = async() => {
  return("yes");
}

export const pinStringToIPFS = async (string: string) => {
  const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MmFlM2E3Mi1mZTVjLTQwY2EtYWJiOS02ZmIzNWI1OGI2NWIiLCJlbWFpbCI6Im1paGFpbDIwMDIyMDE1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4MmZmYTlkY2JjYzEwN2E3MGU3OSIsInNjb3BlZEtleVNlY3JldCI6Ijg1NzNiNGEyMjNlMjViOGM2YjhiZjQ4NjI5MDNkNTE1YTYzMjVhOGQwZTA5ODA4MmRiYzY2OTlhNDU4OGEzYTEiLCJpYXQiOjE3MDAyOTc5NjF9.hO_RGb2KFrtOJAyAqroU-UJqqugqnocTz0YDYHCgo9E'
  try {
    const buffer = Buffer.from(string, 'utf8')
    const stream = Readable.from(buffer)
    const data = new FormData()
    data.append('file', stream, {
      filepath: "string.txt"
    })
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        'Authorization': JWT
      }
    })
    return res.data["IpfsHash"]
  } catch (error: any) {
    return error.message
  }
}