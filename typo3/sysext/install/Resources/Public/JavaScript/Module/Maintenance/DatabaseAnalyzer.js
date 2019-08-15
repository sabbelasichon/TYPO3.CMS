/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __awaiter=this&&this.__awaiter||function(e,t,a,s){return new(a||(a=Promise))((function(n,i){function r(e){try{l(s.next(e))}catch(e){i(e)}}function o(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,o)}l((s=s.apply(e,t||[])).next())}))};define(["require","exports","jquery","../AbstractInteractableModule","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","TYPO3/CMS/Core/Ajax/AjaxRequest","../../Renderable/InfoBox","../../Renderable/ProgressBar","../../Renderable/Severity","../../Router"],(function(e,t,a,s,n,i,r,o,l,c,d){"use strict";class g extends s.AbstractInteractableModule{constructor(){super(...arguments),this.selectorAnalyzeTrigger=".t3js-databaseAnalyzer-analyze",this.selectorExecuteTrigger=".t3js-databaseAnalyzer-execute",this.selectorOutputContainer=".t3js-databaseAnalyzer-output",this.selectorSuggestionBlock=".t3js-databaseAnalyzer-suggestion-block",this.selectorSuggestionList=".t3js-databaseAnalyzer-suggestion-list",this.selectorSuggestionLineTemplate=".t3js-databaseAnalyzer-suggestion-line-template"}initialize(e){this.currentModal=e,this.getData(),e.on("click",".t3js-databaseAnalyzer-suggestion-block-checkbox",e=>{const t=a(e.currentTarget);t.closest("fieldset").find(":checkbox").prop("checked",t.get(0).checked)}),e.on("click",this.selectorAnalyzeTrigger,e=>{e.preventDefault(),this.analyze()}),e.on("click",this.selectorExecuteTrigger,e=>{e.preventDefault(),this.execute()})}getData(){const e=this.getModalBody();new r(d.getUrl("databaseAnalyzer")).get({cache:"no-cache"}).then(t=>__awaiter(this,void 0,void 0,(function*(){const a=yield t.resolve();!0===a.success?(e.empty().append(a.html),n.setButtons(a.buttons),this.analyze()):i.error("Something went wrong")})),t=>{d.handleAjaxError(t,e)})}analyze(){const e=this.getModalBody(),t=this.getModalFooter(),a=e.find(this.selectorOutputContainer),s=t.find(this.selectorExecuteTrigger),n=t.find(this.selectorAnalyzeTrigger);a.empty().append(l.render(c.loading,"Analyzing current database schema...","")),n.prop("disabled",!0),s.prop("disabled",!0),a.on("change",'input[type="checkbox"]',()=>{const e=a.find(":checked").length>0;s.prop("disabled",!e)}),new r(d.getUrl("databaseAnalyzerAnalyze")).get({cache:"no-cache"}).then(t=>__awaiter(this,void 0,void 0,(function*(){const r=yield t.resolve();if(!0===r.success){if(Array.isArray(r.status)&&(a.find(".alert-loading").remove(),r.status.forEach(e=>{const t=o.render(e.severity,e.title,e.message);a.append(t)})),Array.isArray(r.suggestions)){r.suggestions.forEach(t=>{const s=e.find(this.selectorSuggestionBlock).clone();s.removeClass(this.selectorSuggestionBlock.substr(1));const n=t.key;s.find(".t3js-databaseAnalyzer-suggestion-block-legend").text(t.label),s.find(".t3js-databaseAnalyzer-suggestion-block-checkbox").attr("id","t3-install-"+n+"-checkbox"),t.enabled&&s.find(".t3js-databaseAnalyzer-suggestion-block-checkbox").attr("checked","checked"),s.find(".t3js-databaseAnalyzer-suggestion-block-label").attr("for","t3-install-"+n+"-checkbox"),t.children.forEach(a=>{const n=e.find(this.selectorSuggestionLineTemplate).children().clone(),i=a.hash,r=n.find(".t3js-databaseAnalyzer-suggestion-line-checkbox");r.attr("id","t3-install-db-"+i).attr("data-hash",i),t.enabled&&r.attr("checked","checked"),n.find(".t3js-databaseAnalyzer-suggestion-line-label").attr("for","t3-install-db-"+i),n.find(".t3js-databaseAnalyzer-suggestion-line-statement").text(a.statement),void 0!==a.current&&(n.find(".t3js-databaseAnalyzer-suggestion-line-current-value").text(a.current),n.find(".t3js-databaseAnalyzer-suggestion-line-current").show()),void 0!==a.rowCount&&(n.find(".t3js-databaseAnalyzer-suggestion-line-count-value").text(a.rowCount),n.find(".t3js-databaseAnalyzer-suggestion-line-count").show()),s.find(this.selectorSuggestionList).append(n)}),a.append(s.html())});const t=0===a.find(":checked").length;n.prop("disabled",!1),s.prop("disabled",t)}0===r.suggestions.length&&0===r.status.length&&a.append(o.render(c.ok,"Database schema is up to date. Good job!",""))}else i.error("Something went wrong")})),t=>{d.handleAjaxError(t,e)})}execute(){const e=this.getModalBody(),t=this.getModuleContent().data("database-analyzer-execute-token"),s=e.find(this.selectorOutputContainer),n=[];s.find(".t3js-databaseAnalyzer-suggestion-line input:checked").each((e,t)=>{n.push(a(t).data("hash"))}),s.empty().append(l.render(c.loading,"Executing database updates...","")),e.find(this.selectorExecuteTrigger).prop("disabled",!0),e.find(this.selectorAnalyzeTrigger).prop("disabled",!0),new r(d.getUrl()).post({install:{action:"databaseAnalyzerExecute",token:t,hashes:n}}).then(e=>__awaiter(this,void 0,void 0,(function*(){const t=yield e.resolve();!0===t.success&&Array.isArray(t.status)&&t.status.forEach(e=>{i.showMessage(e.title,e.message,e.severity)}),this.analyze()})),t=>{d.handleAjaxError(t,e)})}}return new g}));