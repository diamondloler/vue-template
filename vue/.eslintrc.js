/*
中文官网：http://eslint.cn
规则参考: https://github.com/AlloyTeam/eslint-config-alloy
语法：
	"rule": [
		${level}, // 报错级别："off" 或 0 - 关闭规则；"warn" 或 1，发出警告；"error" 或 2，终止脚本
		${option1}, // 该规则下的其他子限制
		${option2},
		.....
	]
*/


module.exports = {
    extends: [
        'eslint-config-alloy/vue',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
	    "require": false,
        "exports": false,
        "module": false,
        "define": false,
		"performanceInfo": false,
		"HUYASdk": false
    },
    rules: {
        // 这里填入你的项目需要的个性化配置，比如：
        //
        // "indent": [
		// 	"error",
		// 	//一个tab为一个缩进单位 
		// 	"tab",
		// 	{ 
		// 		// 每个switch case一个缩进单位
		// 		"SwitchCase": 1,
		// 		"VariableDeclarator": {
		// 			"var": 1,
		// 			"let": 1,
		// 			"const": 1
		// 		} 
		// 	}
		// ]
		"no-tabs": "off"
    }
};

