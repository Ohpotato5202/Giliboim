package com.kh.giliboim.route.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Position {
	private double lat; // 위도 
	private double lng; // 경도
}
