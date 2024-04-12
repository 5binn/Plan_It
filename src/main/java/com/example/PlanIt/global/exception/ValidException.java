package com.example.PlanIt.global.exception;

import org.springframework.validation.method.MethodValidationException;
import org.springframework.validation.method.MethodValidationResult;

public class ValidException extends MethodValidationException {

    public ValidException(MethodValidationResult msg) {
        super(msg);
    }
}
