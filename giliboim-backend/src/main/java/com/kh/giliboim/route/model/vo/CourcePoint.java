package com.kh.giliboim.route.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourcePoint {
	private Position departure; 
	private Position destination;
}
