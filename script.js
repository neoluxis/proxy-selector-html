var debug = false;

toggleUrlTextarea();

// -------------------------------------

function toggleUrlTextarea() {
  var showUrl = document.getElementById("showUrlCheckbox").checked;
  if (!debug) {
    showUrl = false;
    document.getElementsByClassName("showUrl")[0].style.display = "none";
    document.getElementsByClassName("showUrl")[1].style.display = "none";
  }
  var urlTextarea = document.getElementById("url");
  urlTextarea.style.display = showUrl ? "block" : "none";
}

function sendRequest() {
  var protocolCheckboxes = document.querySelectorAll(
    'input[name="protocol"]:checked'
  );
  var protocol = Array.from(protocolCheckboxes).map(
    (checkbox) => checkbox.value
  );

  var areaCheckboxes = document.querySelectorAll('input[name="area"]:checked');
  var area = Array.from(areaCheckboxes).map((checkbox) => checkbox.value);

  var speedA = document.getElementById("speedA").value;
  var speedB = document.getElementById("speedB").value;

  var selectAll = document.getElementById("selectAllCheckbox").checked;

  var url = "https://pool.neolux.ml/clash/proxies?";

  if (!selectAll) {
    if (protocol.length > 0) {
      url += "type=" + encodeURIComponent(protocol.join(",")) + "&";
    }

    if (area.length > 0) {
      url += "c=" + encodeURIComponent(area.join(",")) + "&";
    }

    if (speedA && speedB) {
      url += "speed=" + encodeURIComponent(speedA + "," + speedB);
    }
  }

  // Show or hide the URL textarea based on the checkbox
  toggleUrlTextarea();

  // Set the URL in the URL textarea
  var urlTextarea = document.getElementById("url");
  urlTextarea.value = url;

  // Send the request to the server
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      var resultsTextarea = document.getElementById("results");
      resultsTextarea.value = response;
    }
  };
  xhr.send();
}
