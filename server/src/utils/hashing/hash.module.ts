import { Module } from "@nestjs/common";
import { Global } from "@nestjs/common";
import { Hashservice } from "./hash.service";

@Global()
@Module({
    providers: [Hashservice],
    exports: [Hashservice]
})

export class Hashmodule { }