let inp = document.querySelector("#inp");

// Add event listener to check input length while user is typing
inp.addEventListener("input", () => {
    let val = inp.value;
    if (val.length > 45) {
        inp.value = val.slice(0, 45);
    }
});

let cnt_tasks = 1;
let max_tasks = 6;
let add = document.querySelector(".btn");

// Add Button
add.addEventListener("click", () => {
    if (inp.value.trim() !== "" && cnt_tasks <= max_tasks) {
        let div = document.createElement("div");
        div.className = "gap-4 flex justify-center items-center w-80";

        let task = document.createElement("div");
        task.className = "task cursor-pointer flex-1 min-w-0";

        let icon = document.createElement("i");
        icon.className =
            "ri-checkbox-blank-circle-line text-white cursor-pointer";

        let rmv = document.createElement("div");
        rmv.textContent = "Remove";
        rmv.className = "btn bg-red-500";
        rmv.setAttribute("id", "rmv");

        let taskName = document.createElement("div");
        taskName.className = "break-words overflow-wrap-anywhere max-w-full";

        task.appendChild(taskName);

        div.appendChild(icon);
        div.appendChild(task);
        div.appendChild(rmv);

        // Add event listener to the remove button when creating the task
        rmv.addEventListener("click", () => {
            div.remove();
            // Optional: decrease counter if you want to allow adding more tasks after removal
            cnt_tasks--;

            // Hide message if tasks are below max limit after removal
            let existingMsg = document.querySelector("#card small");
            if (existingMsg && cnt_tasks <= max_tasks) {
                existingMsg.remove();
            }
        });

        icon.addEventListener("click", () => {
            if (icon.classList.contains("ri-checkbox-blank-circle-line")) {
                icon.className =
                    "ri-checkbox-circle-line text-emerald-400 cursor-pointer";
                task.classList.toggle("line-through");
            } else {
                icon.className = "ri-checkbox-blank-circle-line cursor-pointer";
                task.classList.toggle("line-through");
            }
        });

        task.addEventListener("click", () => {
            if (icon.classList.contains("ri-checkbox-blank-circle-line")) {
                icon.className =
                    "ri-checkbox-circle-line text-emerald-400 cursor-pointer";
                task.classList.toggle("line-through");
            } else {
                icon.className = "ri-checkbox-blank-circle-line cursor-pointer";
                task.classList.toggle("line-through");
            }
        });

        taskName.textContent = inp.value;
        document.querySelector("#card").appendChild(div);
        div.setAttribute("id", `task_${cnt_tasks}`);
        cnt_tasks++;
        inp.value = ""; // Clear input after adding task

        // Check if we've reached the maximum after adding this task
        if (cnt_tasks > max_tasks) {
            // Check if message already exists to avoid duplicates
            let existingMsg = document.querySelector("#card small");
            if (!existingMsg) {
                let msg = document.createElement("small");
                msg.textContent =
                    "You have created the maximum number of tasks.";
                msg.className = "text-red-400 text-center mt-2";
                document.querySelector("#card").appendChild(msg);
            }
        }
    } else if (inp.value.trim() !== "") {
        // This handles when input is not empty but max tasks reached
        // Show message if it doesn't exist
        let existingMsg = document.querySelector("#card small");
        if (!existingMsg) {
            let msg = document.createElement("small");
            msg.textContent = "You have created the maximum number of tasks.";
            msg.className = "text-red-400 text-center mt-2";
            document.querySelector("#card").appendChild(msg);
        }
    }
});
