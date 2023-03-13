
import { EmitContext, Model, CodeTypeEmitter, Program, ModelProperty } from "@typespec/compiler";


/*
export async function $onEmit(context: EmitContext) {
  await process.stdout.write("hello world!");
}
*/

export async function $onEmit(context: EmitContext) {
    const assetEmitter = context.getAssetEmitter(MyCodeEmitter);

    // emit my entire typespec program
    assetEmitter.emitProgram();

    // lastly, write your emit output into the output directory
    await assetEmitter.writeOutput();
}

class MyCodeEmitter extends CodeTypeEmitter {
    programContext(program: Program) {
        const sourceFile = this.emitter.createSourceFile("testout.bsq");
        return {
            scope: sourceFile.globalScope,
        };
    }

    modelDeclaration(model: Model, name: string) {
        const props = this.emitter.emitModelProperties(model);
        return this.emitter.result.declaration(name, `declaration of ${name}`);
    }

    modelPropertyLiteral(property: ModelProperty) {
        return `a property named ${property.name} and a type of ${this.emitter.emitType(property.type)}`;
    }

    modelLiteral(model: Model) {
        return `an object literal`;
    }
}
