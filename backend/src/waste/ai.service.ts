import { Injectable, OnModuleInit } from '@nestjs/common';
import * as ort from 'onnxruntime-node';
import sharp from 'sharp';
import * as path from 'path';

@Injectable()
export class AiService implements OnModuleInit {
    private session!: ort.InferenceSession;

    async onModuleInit() {
        this.session =
            await ort.InferenceSession.create(
                path.join(
                    process.cwd(),
                    'src/assets/full_model.onnx',
                ),
            );

        console.log('ONNX cargado');
        console.log(this.session.inputNames);
        console.log(this.session.outputNames);
    }

    async predict(
        imageBuffer: Buffer,
    ): Promise<number[]> {
        const resized = await sharp(imageBuffer)
            .resize(224, 224)
            .removeAlpha()
            .raw()
            .toBuffer();

        const inputData = Float32Array.from(
            resized,
            (pixel) => pixel / 255,
        );

        const inputName =
            this.session.inputNames[0];

        const tensor = new ort.Tensor(
            'float32',
            inputData,
            [1, 224, 224, 3],
        );

        const results =
            await this.session.run({
                [inputName]: tensor,
            });

        const outputName =
            this.session.outputNames[0];

        return Array.from(
            results[outputName].data as Float32Array,
        );
    }
}