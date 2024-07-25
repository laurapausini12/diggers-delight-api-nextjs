"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/titles";
exports.ids = ["pages/api/titles"];
exports.modules = {

/***/ "https-proxy-agent":
/*!************************************!*\
  !*** external "https-proxy-agent" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("https-proxy-agent");

/***/ }),

/***/ "@vercel/postgres":
/*!***********************************!*\
  !*** external "@vercel/postgres" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("@vercel/postgres");;

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/titles.ts":
/*!*****************************!*\
  !*** ./pages/api/titles.ts ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var https_proxy_agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https-proxy-agent */ \"https-proxy-agent\");\n/* harmony import */ var https_proxy_agent__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https_proxy_agent__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_dbService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/dbService */ \"(api)/./services/dbService.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__, _services_dbService__WEBPACK_IMPORTED_MODULE_2__]);\n([axios__WEBPACK_IMPORTED_MODULE_0__, _services_dbService__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst BASE_URL = \"https://new.myfreemp3juices.cc/api/\";\nconst ENDPOINT = \"api_search.php?callback=jQuery2130003814019662980783_1697629885270\";\nconst URL = `${BASE_URL}${ENDPOINT}`;\nconst TIMEOUT = 4500;\nasync function postData(url, interAddress, data) {\n    // As Axios timeout is not working with https-proxy-agent, we also need to use a custom timeout.\n    const source = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].CancelToken.source();\n    const timeout = setTimeout(()=>{\n        source.cancel();\n        console.log(\"Request canceled due to timeout\");\n    }, TIMEOUT);\n    try {\n        const interAgent = new https_proxy_agent__WEBPACK_IMPORTED_MODULE_1__.HttpsProxyAgent(interAddress);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(url, data, {\n            httpAgent: interAgent,\n            httpsAgent: interAgent,\n            timeout: TIMEOUT,\n            headers: {\n                \"Content-Type\": \"multipart/form-data\"\n            },\n            maxContentLength: 100 * 1024,\n            cancelToken: source.token\n        });\n        clearTimeout(timeout);\n        return response.data;\n    } catch (error) {\n        clearTimeout(timeout);\n        if (axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isAxiosError(error)) {\n            if (axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isCancel(error)) {\n                console.log(\"Request canceled:\", error.message);\n            } else {\n                console.log(`Failed to post data: ${error.message}`);\n            }\n            throw new Error(`Failed to post data: ${error.message}`);\n        } else {\n            console.log(\"An unknown error occurred\");\n            throw error;\n        }\n    }\n}\nfunction extractStringBetweenFirstAndLastParentheses(str) {\n    const firstParenthesesIndex = str.indexOf(\"(\");\n    const lastParenthesesIndex = str.lastIndexOf(\")\");\n    return str.slice(firstParenthesesIndex + 1, lastParenthesesIndex);\n}\nasync function handler(req, res) {\n    if (req.method !== \"GET\") {\n        res.status(405).json({\n            error: \"Method not allowed\"\n        });\n        return;\n    }\n    const query = req.query.query;\n    if (typeof query !== \"string\") {\n        res.status(400).json({\n            error: \"Query parameter must be a string\"\n        });\n        return;\n    }\n    if (!query.trim()) {\n        res.status(400).json({\n            error: \"Query parameter is required\"\n        });\n        return;\n    }\n    let interQuery = req.query.inter;\n    let inter = null;\n    if (typeof interQuery !== \"string\") {\n        res.status(400).json({\n            error: \"Inter parameter must be a string\"\n        });\n        return;\n    }\n    if (!interQuery.trim()) {\n        inter = await (0,_services_dbService__WEBPACK_IMPORTED_MODULE_2__.getFastestInter)();\n        if (!inter) {\n            res.status(500).json({\n                error: \"No inters available\"\n            });\n            return;\n        }\n    } else {\n        inter = interQuery;\n    }\n    console.log(`Using inter: ${inter}`);\n    let data = {\n        q: query,\n        page: \"0\"\n    };\n    const MAX_RETRIES = 3;\n    for(let i = 0; i < MAX_RETRIES; i++){\n        console.log(`Try number ${i + 1}`);\n        try {\n            const result = await postData(URL, inter, data);\n            const jsonText = extractStringBetweenFirstAndLastParentheses(result);\n            const json = JSON.parse(jsonText);\n            if (json[\"response\"] !== null) {\n                res.status(200).json(json[\"response\"]);\n                return;\n            } else {\n                console.log(`Response null with proxy ${inter}. Retrying`);\n            }\n        } catch (error) {\n            const errorMessagePrefixe = `Failed to fetch data with inter ${inter}: `;\n            let errorMessageBody = \"\";\n            if (error instanceof Error) {\n                errorMessageBody = error.message;\n            } else {\n                errorMessageBody = \"An unknown error occurred\";\n            }\n            res.status(500).json({\n                error: `${errorMessagePrefixe}${errorMessageBody}`\n            });\n            return;\n        }\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLENBQUNHLE9BQU8sQ0FBQztZQUNuQyxPQUFPO2dCQUNMNEIsZ0JBQWdCLEdBQUcsMkJBQTJCLENBQUM7WUFDakQsQ0FBQztZQUNEakIsR0FBRyxDQUNBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1hDLElBQUksQ0FBQztnQkFBRWpCLEtBQUssRUFBRSxDQUFDLEVBQUU4QixtQkFBbUIsQ0FBQyxFQUFFQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQUUsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87UUFDVCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWdnZXJzLWRlbGlnaHQtbmV4dGpzLy4vcGFnZXMvYXBpL3RpdGxlcy50cz9mYzkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IGF4aW9zLCB7IENhbmNlbFRva2VuU291cmNlIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBIdHRwc1Byb3h5QWdlbnQgfSBmcm9tIFwiaHR0cHMtcHJveHktYWdlbnRcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGdldEZhc3Rlc3RJbnRlciwgZGVsZXRlSW50ZXIgfSBmcm9tIFwiQHNlcnZpY2VzL2RiU2VydmljZVwiO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcImh0dHBcIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vbmV3Lm15ZnJlZW1wM2p1aWNlcy5jYy9hcGkvXCI7XG5jb25zdCBFTkRQT0lOVCA9XG4gIFwiYXBpX3NlYXJjaC5waHA/Y2FsbGJhY2s9alF1ZXJ5MjEzMDAwMzgxNDAxOTY2Mjk4MDc4M18xNjk3NjI5ODg1MjcwXCI7XG5jb25zdCBVUkwgPSBgJHtCQVNFX1VSTH0ke0VORFBPSU5UfWA7XG5jb25zdCBUSU1FT1VUID0gNDUwMDtcblxuYXN5bmMgZnVuY3Rpb24gcG9zdERhdGEoXG4gIHVybDogc3RyaW5nLFxuICBpbnRlckFkZHJlc3M6IHN0cmluZyxcbiAgZGF0YTogUmVjb3JkPHN0cmluZywgYW55PlxuKTogUHJvbWlzZTxhbnk+IHtcbiAgLy8gQXMgQXhpb3MgdGltZW91dCBpcyBub3Qgd29ya2luZyB3aXRoIGh0dHBzLXByb3h5LWFnZW50LCB3ZSBhbHNvIG5lZWQgdG8gdXNlIGEgY3VzdG9tIHRpbWVvdXQuXG4gIGNvbnN0IHNvdXJjZTogQ2FuY2VsVG9rZW5Tb3VyY2UgPSBheGlvcy5DYW5jZWxUb2tlbi5zb3VyY2UoKTtcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNvdXJjZS5jYW5jZWwoKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3QgY2FuY2VsZWQgZHVlIHRvIHRpbWVvdXRcIik7XG4gIH0sIFRJTUVPVVQpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgaW50ZXJBZ2VudCA9IG5ldyBIdHRwc1Byb3h5QWdlbnQoaW50ZXJBZGRyZXNzKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QodXJsLCBkYXRhLCB7XG4gICAgICBodHRwQWdlbnQ6IGludGVyQWdlbnQsXG4gICAgICBodHRwc0FnZW50OiBpbnRlckFnZW50LFxuICAgICAgdGltZW91dDogVElNRU9VVCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIsXG4gICAgICB9LFxuICAgICAgbWF4Q29udGVudExlbmd0aDogMTAwICogMTAyNCwgLy8gMTAwIEtCXG4gICAgICBjYW5jZWxUb2tlbjogc291cmNlLnRva2VuLFxuICAgIH0pO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgaWYgKGF4aW9zLmlzQXhpb3NFcnJvcihlcnJvcikpIHtcbiAgICAgIGlmIChheGlvcy5pc0NhbmNlbChlcnJvcikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IGNhbmNlbGVkOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGYWlsZWQgdG8gcG9zdCBkYXRhOiAkeyhlcnJvciBhcyBhbnkpLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwb3N0IGRhdGE6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJBbiB1bmtub3duIGVycm9yIG9jY3VycmVkXCIpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RTdHJpbmdCZXR3ZWVuRmlyc3RBbmRMYXN0UGFyZW50aGVzZXMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmaXJzdFBhcmVudGhlc2VzSW5kZXggPSBzdHIuaW5kZXhPZihcIihcIik7XG4gIGNvbnN0IGxhc3RQYXJlbnRoZXNlc0luZGV4ID0gc3RyLmxhc3RJbmRleE9mKFwiKVwiKTtcbiAgcmV0dXJuIHN0ci5zbGljZShmaXJzdFBhcmVudGhlc2VzSW5kZXggKyAxLCBsYXN0UGFyZW50aGVzZXNJbmRleCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiR0VUXCIpIHtcbiAgICByZXMuc3RhdHVzKDQwNSkuanNvbih7IGVycm9yOiBcIk1ldGhvZCBub3QgYWxsb3dlZFwiIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHF1ZXJ5ID0gcmVxLnF1ZXJ5LnF1ZXJ5O1xuICBpZiAodHlwZW9mIHF1ZXJ5ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJRdWVyeSBwYXJhbWV0ZXIgbXVzdCBiZSBhIHN0cmluZ1wiIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXF1ZXJ5LnRyaW0oKSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiUXVlcnkgcGFyYW1ldGVyIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGludGVyUXVlcnkgPSByZXEucXVlcnkuaW50ZXI7XG4gIGxldCBpbnRlcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGlmICh0eXBlb2YgaW50ZXJRdWVyeSAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiSW50ZXIgcGFyYW1ldGVyIG11c3QgYmUgYSBzdHJpbmdcIiB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFpbnRlclF1ZXJ5LnRyaW0oKSkge1xuICAgIGludGVyID0gYXdhaXQgZ2V0RmFzdGVzdEludGVyKCk7XG4gICAgaWYgKCFpbnRlcikge1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJObyBpbnRlcnMgYXZhaWxhYmxlXCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGludGVyID0gaW50ZXJRdWVyeTtcbiAgfVxuICBjb25zb2xlLmxvZyhgVXNpbmcgaW50ZXI6ICR7aW50ZXJ9YCk7XG5cbiAgbGV0IGRhdGEgPSB7XG4gICAgcTogcXVlcnksXG4gICAgcGFnZTogXCIwXCIsXG4gIH07XG5cbiAgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9SRVRSSUVTOyBpKyspIHtcbiAgICBjb25zb2xlLmxvZyhgVHJ5IG51bWJlciAke2kgKyAxfWApO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQ6IHN0cmluZyA9IGF3YWl0IHBvc3REYXRhKFVSTCwgaW50ZXIsIGRhdGEpO1xuICAgICAgY29uc3QganNvblRleHQgPSBleHRyYWN0U3RyaW5nQmV0d2VlbkZpcnN0QW5kTGFzdFBhcmVudGhlc2VzKHJlc3VsdCk7XG4gICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShqc29uVGV4dCk7XG4gICAgICBpZiAoanNvbltcInJlc3BvbnNlXCJdICE9PSBudWxsKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGpzb25bXCJyZXNwb25zZVwiXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZXNwb25zZSBudWxsIHdpdGggcHJveHkgJHtpbnRlcn0uIFJldHJ5aW5nYCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZVByZWZpeGUgPSBgRmFpbGVkIHRvIGZldGNoIGRhdGEgd2l0aCBpbnRlciAke2ludGVyfTogYDtcbiAgICAgIGxldCBlcnJvck1lc3NhZ2VCb2R5ID0gXCJcIjtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZUJvZHkgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlQm9keSA9IFwiQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgfVxuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoNTAwKVxuICAgICAgICAuanNvbih7IGVycm9yOiBgJHtlcnJvck1lc3NhZ2VQcmVmaXhlfSR7ZXJyb3JNZXNzYWdlQm9keX1gIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiSHR0cHNQcm94eUFnZW50IiwiZ2V0RmFzdGVzdEludGVyIiwiQkFTRV9VUkwiLCJFTkRQT0lOVCIsIlVSTCIsIlRJTUVPVVQiLCJwb3N0RGF0YSIsInVybCIsImludGVyQWRkcmVzcyIsImRhdGEiLCJzb3VyY2UiLCJDYW5jZWxUb2tlbiIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FuY2VsIiwiY29uc29sZSIsImxvZyIsImludGVyQWdlbnQiLCJyZXNwb25zZSIsInBvc3QiLCJodHRwQWdlbnQiLCJodHRwc0FnZW50IiwiaGVhZGVycyIsIm1heENvbnRlbnRMZW5ndGgiLCJjYW5jZWxUb2tlbiIsInRva2VuIiwiY2xlYXJUaW1lb3V0IiwiZXJyb3IiLCJpc0F4aW9zRXJyb3IiLCJpc0NhbmNlbCIsIm1lc3NhZ2UiLCJFcnJvciIsImV4dHJhY3RTdHJpbmdCZXR3ZWVuRmlyc3RBbmRMYXN0UGFyZW50aGVzZXMiLCJzdHIiLCJmaXJzdFBhcmVudGhlc2VzSW5kZXgiLCJpbmRleE9mIiwibGFzdFBhcmVudGhlc2VzSW5kZXgiLCJsYXN0SW5kZXhPZiIsInNsaWNlIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJxdWVyeSIsInRyaW0iLCJpbnRlclF1ZXJ5IiwiaW50ZXIiLCJxIiwicGFnZSIsIk1BWF9SRVRSSUVTIiwiaSIsInJlc3VsdCIsImpzb25UZXh0IiwiSlNPTiIsInBhcnNlIiwiZXJyb3JNZXNzYWdlUHJlZml4ZSIsImVycm9yTWVzc2FnZUJvZHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/titles.ts\n");

/***/ }),

/***/ "(api)/./services/dbService.ts":
/*!*******************************!*\
  !*** ./services/dbService.ts ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createIntersTableIfNotExists\": () => (/* binding */ createIntersTableIfNotExists),\n/* harmony export */   \"deleteInter\": () => (/* binding */ deleteInter),\n/* harmony export */   \"emptyIntersTable\": () => (/* binding */ emptyIntersTable),\n/* harmony export */   \"getFastestInter\": () => (/* binding */ getFastestInter),\n/* harmony export */   \"getInters\": () => (/* binding */ getInters),\n/* harmony export */   \"insertInters\": () => (/* binding */ insertInters)\n/* harmony export */ });\n/* harmony import */ var _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vercel/postgres */ \"@vercel/postgres\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_vercel_postgres__WEBPACK_IMPORTED_MODULE_0__]);\n_vercel_postgres__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst INTERS_RELATION_NAME = \"inters\";\nclass COLUMNS_NAME {\n    static ADDRESS = \"address\";\n    static TIME = \"time\";\n}\nasync function getInters() {\n    const query = `SELECT * FROM ${INTERS_RELATION_NAME}`;\n    return _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n}\nasync function getFastestInter() {\n    const query = `SELECT * FROM ${INTERS_RELATION_NAME} ORDER BY ${COLUMNS_NAME.TIME} ASC LIMIT 1`;\n    const result = await _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n    if (!result.rows.length) {\n        return null;\n    }\n    return result.rows[0].address;\n}\nasync function deleteInter(address) {\n    const query = `DELETE FROM ${INTERS_RELATION_NAME} WHERE ${COLUMNS_NAME.ADDRESS} = '${address}'`;\n    return _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n}\nfunction createIntersTableIfNotExists() {\n    const query = `\n    CREATE TABLE IF NOT EXISTS ${INTERS_RELATION_NAME} (\n      ${COLUMNS_NAME.ADDRESS} TEXT PRIMARY KEY,\n      ${COLUMNS_NAME.TIME} NUMERIC\n    )\n  `;\n    return _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n}\nasync function emptyIntersTable() {\n    const query = `DELETE FROM ${INTERS_RELATION_NAME}`;\n    return _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n}\nasync function insertInters(values) {\n    for (const value of values){\n        const query = `\n      INSERT INTO ${INTERS_RELATION_NAME} (${COLUMNS_NAME.ADDRESS}, ${COLUMNS_NAME.TIME}) \n      VALUES ('${value[0]}', ${value[1]})\n    `;\n        await _vercel_postgres__WEBPACK_IMPORTED_MODULE_0__.sql.query(query);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zZXJ2aWNlcy9kYlNlcnZpY2UudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUF1QztBQUV2QyxNQUFNQyxvQkFBb0IsR0FBRyxRQUFRO0FBRXJDLE1BQU1DLFlBQVk7SUFDaEIsT0FBZ0JDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDcEMsT0FBZ0JDLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDL0I7QUFFTSxlQUFlQyxTQUFTLEdBQUc7SUFDaEMsTUFBTUMsS0FBSyxHQUFHLENBQUMsY0FBYyxFQUFFTCxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JELE9BQU9ELHVEQUFTLENBQUNNLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFTSxlQUFlQyxlQUFlLEdBQTJCO0lBQzlELE1BQU1ELEtBQUssR0FBRyxDQUFDLGNBQWMsRUFBRUwsb0JBQW9CLENBQUMsVUFBVSxFQUFFQyxZQUFZLENBQUNFLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDL0YsTUFBTUksTUFBTSxHQUFHLE1BQU1SLHVEQUFTLENBQUNNLEtBQUssQ0FBQztJQUNyQyxJQUFJLENBQUNFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBT0YsTUFBTSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNFLE9BQU8sQ0FBQztBQUNoQyxDQUFDO0FBRU0sZUFBZUMsV0FBVyxDQUFDRCxPQUFlLEVBQUU7SUFDakQsTUFBTUwsS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFTCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUVDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLElBQUksRUFBRVEsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNoRyxPQUFPWCx1REFBUyxDQUFDTSxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRU0sU0FBU08sNEJBQTRCLEdBQUc7SUFDN0MsTUFBTVAsS0FBSyxHQUFHLENBQUM7K0JBQ2MsRUFBRUwsb0JBQW9CLENBQUM7TUFDaEQsRUFBRUMsWUFBWSxDQUFDQyxPQUFPLENBQUM7TUFDdkIsRUFBRUQsWUFBWSxDQUFDRSxJQUFJLENBQUM7O0VBRXhCLENBQUM7SUFDRCxPQUFPSix1REFBUyxDQUFDTSxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRU0sZUFBZVEsZ0JBQWdCLEdBQUc7SUFDdkMsTUFBTVIsS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFTCxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25ELE9BQU9ELHVEQUFTLENBQUNNLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFTSxlQUFlUyxZQUFZLENBQUNDLE1BQTBCLEVBQUU7SUFDN0QsS0FBSyxNQUFNQyxLQUFLLElBQUlELE1BQU0sQ0FBRTtRQUMxQixNQUFNVixLQUFLLEdBQUcsQ0FBQztrQkFDRCxFQUFFTCxvQkFBb0IsQ0FBQyxFQUFFLEVBQUVDLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLEVBQUUsRUFBRUQsWUFBWSxDQUFDRSxJQUFJLENBQUM7ZUFDekUsRUFBRWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7UUFDRCxNQUFNakIsdURBQVMsQ0FBQ00sS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWdnZXJzLWRlbGlnaHQtbmV4dGpzLy4vc2VydmljZXMvZGJTZXJ2aWNlLnRzP2Y4NDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3FsIH0gZnJvbSBcIkB2ZXJjZWwvcG9zdGdyZXNcIjtcblxuY29uc3QgSU5URVJTX1JFTEFUSU9OX05BTUUgPSBcImludGVyc1wiO1xuXG5jbGFzcyBDT0xVTU5TX05BTUUge1xuICBzdGF0aWMgcmVhZG9ubHkgQUREUkVTUyA9IFwiYWRkcmVzc1wiO1xuICBzdGF0aWMgcmVhZG9ubHkgVElNRSA9IFwidGltZVwiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW50ZXJzKCkge1xuICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7SU5URVJTX1JFTEFUSU9OX05BTUV9YDtcbiAgcmV0dXJuIHNxbC5xdWVyeShxdWVyeSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGYXN0ZXN0SW50ZXIoKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtJTlRFUlNfUkVMQVRJT05fTkFNRX0gT1JERVIgQlkgJHtDT0xVTU5TX05BTUUuVElNRX0gQVNDIExJTUlUIDFgO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBzcWwucXVlcnkocXVlcnkpO1xuICBpZiAoIXJlc3VsdC5yb3dzLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZXN1bHQucm93c1swXS5hZGRyZXNzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW50ZXIoYWRkcmVzczogc3RyaW5nKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gYERFTEVURSBGUk9NICR7SU5URVJTX1JFTEFUSU9OX05BTUV9IFdIRVJFICR7Q09MVU1OU19OQU1FLkFERFJFU1N9ID0gJyR7YWRkcmVzc30nYDtcbiAgcmV0dXJuIHNxbC5xdWVyeShxdWVyeSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnRlcnNUYWJsZUlmTm90RXhpc3RzKCkge1xuICBjb25zdCBxdWVyeSA9IGBcbiAgICBDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyAke0lOVEVSU19SRUxBVElPTl9OQU1FfSAoXG4gICAgICAke0NPTFVNTlNfTkFNRS5BRERSRVNTfSBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgJHtDT0xVTU5TX05BTUUuVElNRX0gTlVNRVJJQ1xuICAgIClcbiAgYDtcbiAgcmV0dXJuIHNxbC5xdWVyeShxdWVyeSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbXB0eUludGVyc1RhYmxlKCkge1xuICBjb25zdCBxdWVyeSA9IGBERUxFVEUgRlJPTSAke0lOVEVSU19SRUxBVElPTl9OQU1FfWA7XG4gIHJldHVybiBzcWwucXVlcnkocXVlcnkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5zZXJ0SW50ZXJzKHZhbHVlczogW3N0cmluZywgbnVtYmVyXVtdKSB7XG4gIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgY29uc3QgcXVlcnkgPSBgXG4gICAgICBJTlNFUlQgSU5UTyAke0lOVEVSU19SRUxBVElPTl9OQU1FfSAoJHtDT0xVTU5TX05BTUUuQUREUkVTU30sICR7Q09MVU1OU19OQU1FLlRJTUV9KSBcbiAgICAgIFZBTFVFUyAoJyR7dmFsdWVbMF19JywgJHt2YWx1ZVsxXX0pXG4gICAgYDtcbiAgICBhd2FpdCBzcWwucXVlcnkocXVlcnkpO1xuICB9XG59XG4iXSwibmFtZXMiOlsic3FsIiwiSU5URVJTX1JFTEFUSU9OX05BTUUiLCJDT0xVTU5TX05BTUUiLCJBRERSRVNTIiwiVElNRSIsImdldEludGVycyIsInF1ZXJ5IiwiZ2V0RmFzdGVzdEludGVyIiwicmVzdWx0Iiwicm93cyIsImxlbmd0aCIsImFkZHJlc3MiLCJkZWxldGVJbnRlciIsImNyZWF0ZUludGVyc1RhYmxlSWZOb3RFeGlzdHMiLCJlbXB0eUludGVyc1RhYmxlIiwiaW5zZXJ0SW50ZXJzIiwidmFsdWVzIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./services/dbService.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/titles.ts"));
module.exports = __webpack_exports__;

})();