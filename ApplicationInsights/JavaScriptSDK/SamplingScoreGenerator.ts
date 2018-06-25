﻿import { HashCodeScoreGenerator } from './HashCodeScoreGenerator';
import { IEnvelope, ContextTagKeys } from 'applicationinsights-common';

export class SamplingScoreGenerator {
    private hashCodeGeneragor: HashCodeScoreGenerator;

    constructor() {
        this.hashCodeGeneragor = new HashCodeScoreGenerator();
    }

    public getSamplingScore(envelope: IEnvelope): number {
        var tagKeys: ContextTagKeys = new ContextTagKeys();
        var score: number = 0;
        if (envelope.tags[tagKeys.userId]) {
            score = this.hashCodeGeneragor.getHashCodeScore(envelope.tags[tagKeys.userId]);
        } else if (envelope.tags[tagKeys.operationId]) {
            score = this.hashCodeGeneragor.getHashCodeScore(envelope.tags[tagKeys.operationId]);
        } else {
            score = Math.random()
        }

        return score;
    }
}